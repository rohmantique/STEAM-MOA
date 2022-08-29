import React, { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import Swal from "sweetalert2";
import UserVideoComponent from "../../components/VideoChat/UserVideoComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faCameraRotate,
} from "@fortawesome/free-solid-svg-icons";

const OPENVIDU_SERVER_URL = "https://i7a303.p.ssafy.io:4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

class VideoChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "party9",
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      videoOn: true,
      micOn: true,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentDidUpdate() {
    console.log(this.state.subscribers);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();
    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          const newSubscribers = [...subscribers, subscriber];

          // Update the state with the new subscribers
          this.setState({
            subscribers: newSubscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        mySession.on("signal:toggle", () => {
          this.setState({ subscribers: [...this.state.subscribers] });
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.props.userId })
            .then(async () => {
              let videoDevices = await this.OV.getUserMedia({
                audioSource: true,
                videoSource: undefined,
              });

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0], // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }
  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const doFirst = () => {
      const mySession = this.state.session;
      if (mySession) {
        mySession.disconnect();
      }
      // Empty all properties...
      this.OV = null;
      this.setState({
        session: undefined,
        subscribers: [],
        mainStreamManager: undefined,
        publisher: undefined,
      });
    };
    Swal.fire({
      title: "정말로 채팅방을 나가시겠어요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "나갈래요",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await doFirst();
        this.props.leaveChat();
      }
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);
          await this.state.session.publish(newPublisher);

          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "다른 디바이스를 찾을 수 없습니다 &#128517",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async toggleMute() {
    try {
      const publisher = this.state.publisher;
      if (publisher === undefined) return;
      await publisher.publishAudio(!this.state.micOn);
      this.setState({ micOn: !this.state.micOn });
      this.state.session.signal({ data: "toggleMute", type: "signal:toggle" });
    } catch (e) {
      console.error(e);
    }
  }

  async toggleVideo() {
    try {
      const publisher = this.state.publisher;
      if (publisher === undefined) return;
      await publisher.publishVideo(!this.state.videoOn);
      this.setState({ videoOn: !this.state.videoOn });
      this.state.session.signal({ data: "toggleVideo", type: "signal:toggle" });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  render() {
    const myPartyName = this.props.partyName;
    const myGameName = this.props.gameName;
    const myVideoOn = this.state.videoOn;
    const myMicOn = this.state.micOn;
    return (
      <div>
        {this.state.session !== undefined ? (
          <div className="h-screen session flex flex-col">
            <div className="flex flex-row justify-between items-center w-full h-[8%] bg-main-400 p-2">
              <div className="flex flex-row items-center">
                <div className="w-fit font-blackSans text-2xl p-2 rounded text-white bg-moa-yellow-dark mr-2">
                  게임중
                </div>
                <div className="w-fit font-blackSans text-2xl text-gray-100">
                  [{myPartyName}]
                </div>
              </div>
              <div className="text-white">[{myGameName}]</div>
            </div>
            <div className="w-full h-[8%] flex flex-row justify-center items-center my-auto">
              <button
                className="w-10 h-10 border border-white rounded-full mr-4"
                onClick={this.switchCamera}
              >
                <FontAwesomeIcon
                  className="text-white text-lg"
                  icon={faCameraRotate}
                />
              </button>
              <button
                className={`${
                  myMicOn
                    ? "border-white text-white"
                    : " border-red-600 text-red-600"
                } w-10 h-10 border text-sm rounded-full mr-4`}
                onClick={this.toggleMute}
              >
                {myMicOn ? (
                  <FontAwesomeIcon icon={faMicrophone} />
                ) : (
                  <FontAwesomeIcon icon={faMicrophoneSlash} />
                )}
              </button>
              <button
                className={`${
                  myVideoOn
                    ? "border-white text-white"
                    : " border-red-600 text-red-600"
                } w-10 h-10 border text-sm rounded-full mr-4`}
                onClick={this.toggleVideo}
              >
                {myVideoOn ? (
                  <FontAwesomeIcon icon={faVideo} />
                ) : (
                  <FontAwesomeIcon icon={faVideoSlash} />
                )}
              </button>
              <button
                className="bg-red-500 w-10 h-10 text-white rounded-full"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
              >
                <FontAwesomeIcon
                  className="text-white text-lg"
                  icon={faClose}
                />
              </button>
            </div>
            {/* 사용자 */}
            <div
              id="video-container"
              className="w-full h-[84%] mt-2 p-3 flex flex-wrap justify-center items-center overflow-auto"
            >
              {this.state.mainStreamManager !== undefined ? (
                <div id="main-video">
                  <UserVideoComponent
                    streamManager={this.state.mainStreamManager}
                    isMine={true}
                    isMute={myMicOn}
                    isActiveVideo={myVideoOn}
                  />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className=""
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <UserVideoComponent
                    streamManager={sub}
                    isMute={sub.stream.audioActive}
                    isActiveVideo={sub.stream.videoActive}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default VideoChat;
