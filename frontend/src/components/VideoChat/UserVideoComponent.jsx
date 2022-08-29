import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div className="max-w-[360px] max-h-[270px]">
        {this.props.streamManager !== undefined ? (
          this.props.isActiveVideo ? (
            <div className="w-full h-auto">
              <OpenViduVideoComponent
                streamManager={this.props.streamManager}
                isMute={this.props.isMute}
              />
              <div
                className={`${
                  this.props.isMine ? "bg-sky-400 " : "bg-gray-100 "
                }absolute text-semibold px-3 rounded`}>
                <p>{this.getNicknameTag()}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-auto relative">
              <img className="rounded" src={`${process.env.PUBLIC_URL}/ImgAssets/chatMixPurple.png`} />
              <div
                className={`${
                  this.props.isMine ? "bg-sky-400 " : "bg-gray-100 "
                }absolute top-0 left-0 text-semibold px-3 rounded`}>
                <p>{this.getNicknameTag()}</p>
              </div>
            </div>
          )
        ) : null}
      </div>
    );
  }
}
