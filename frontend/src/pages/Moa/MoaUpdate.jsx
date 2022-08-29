import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { moaDelete, moaUpdate } from "../../api/Moazone";
import { moaDetail } from "../../api/Moazone";
import Swal from "sweetalert2";

const MoaUpdate = (props) => {

  const navigate = useNavigate();
  const params = useParams();
  const partyId = params.party_id;
  const [moa, setMoa] = useState({});

  const [updateMoa, setUpdateMoa] = useState({
    partyDescription: "",
    chatLink: "",
    partyTags: [],
    partyStatus: "",
    partyUsers: [],
  });

  const items = ["즐겜", "빡겜", "공략겜", "무지성겜", "친목겜"];
  const [checkedList, setCheckedList] = useState([]);

  const onCheckedElement = (event) => {
  const { checked, value } = event.target;

    if (checked) {
      let newChk = [...checkedList];
      newChk.push(value);
      setCheckedList(newChk);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== value));
    }
  };

  // const onRemove = (item) => {
  //   setCheckedList(checkedList.filter((el) => el !== item));
  // };

  const onChange = (event) => {
    let { name, value } = event.target;
    if (name === "partyTags") {
      value = [...updateMoa.partyTags, value];
    }
    setUpdateMoa({
      ...updateMoa,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    moaUpdate(updateMoa, partyId).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "모아글 수정 완료!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/moazone/detail/${moa.partyId}`);
      } else {
        alert(res.data.message);
      }
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "정말로 나가시겠어요?",
      text: "지금까지 작성한 내용은 저장되지 않습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "나갈래요",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate(`/moazone/detail/${partyId}`);
      }
    });
  };

  const handleDeleteParty = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "정말로 삭제하시겠어요?",
      text: "파티원을 다시 모집하셔야 합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제할래요",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        moaDelete(partyId)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "모아글 삭제 완료!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(`/moazone`);
          }
        });
      }
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  useEffect((e) => {
    moaDetail(partyId).then(({ data }) => {
      setMoa(data);
      setUpdateMoa({
        ...updateMoa,
        partyDescription: data.partyDescription,
        chatLink: data.chatLink,
        partyTags: data.partyTags,
        partyStatus: data.partyStatus,
        partyUsers: [data.partyPlayers[0].userId],
      });
      setCheckedList(() => {
        const list = [];
        data.partyTags.forEach((tag) => {
          const idx = items.findIndex((item) => item === tag);
          list.push(`${idx + 1}`);
        });
        return list;
      });
    });
  }, []);

  useEffect(() => {
    setUpdateMoa({
      ...updateMoa,
      partyTags: checkedList,
    });
  }, [checkedList]);

  return (
    <>
      <Navbar />
      <div className="w-full tablet:w-per75 mx-auto min-h-full text-white font-sans">
      <div className="w-full bg-[#1E1B1C] laptop:h-[10em] h-[8em] flex items-center">
        <img src="../../ImgAssets/MoaZone_UpdateVer.gif" alt="게임모아 메인 배너" className="laptop:object-none object-none w-full h-full"/>
      </div>
        <div className="w-full h-[1.5em] mb-2 bg-main-300 text-main-300 bg-gradient-to-b from-bg-search-gradient-from via-bg-search-gradient-via to-bg-search-gradient-to "></div>
        <form>
          <div className="m-auto h-full mb-2 bg-main-400">
            <div className="createContainer p-4">
              <div className=" mb-[0.6em]  flex justify-between">
                <div className="font-blackSans text-[1.2em] flex items-center">모아글 수정</div>
                <button className="bg-mainBtn-blue hover:bg-moa-pink-dark rounded py-2 px-4 text-center text-sm" onClick={handleDeleteParty}>
                  모아글 삭제
                </button>
              </div>
              <input
                name="partyTitle"
                value={moa.partyTitle}
                onChange={onChange}
                className="bg-mainBtn-disabled w-full text-main-500 text-[0.9em] rounded mb-[0.6em]"
                type="text"
                placeholder="파티 모집 제목"
                disabled
              />
              <div className="grid grid-flow-col mb-3">
                <span className="col-span-1 flex items-center text-[0.9em]">플레이 게임</span>
                <input
                  name="gameName"
                  value={moa.gameName}
                  onChange={onChange}
                  className="col-span-12 text-main-500 bg-mainBtn-disabled rounded"
                  type="text"
                  placeholder="게임 제목을 검색하세요"
                  disabled
                />
              </div>
              <div className="grid tablet:grid-flow-col grid-flow-row mb-3">
                <div className="grid grid-flow-col col-span-2 tablet:mx-2 mr-1 tablet:mb-0 mb-[0.6em]">
                  <span className="tablet:col-span-1 flex items-center text-[0.9em]">플레이 인원</span>
                  <input
                    name="maxPlayer"
                    value={moa.maxPlayer}
                    onChange={onChange}
                    className="tablet:col-span-4 col-span-5 w-full text-main-500 bg-mainBtn-disabled rounded text-[0.9em]"
                    type="number"
                    disabled
                  />
                </div>
                <div className="grid grid-flow-col col-span-2">
                  <span className="col-span-1 flex tablet:justify-center items-center tablet:mr-2 text-[0.9em]">시작시간</span>
                  <div className="tablet:col-span-7 col-span-3">
                    <input
                      name="startTime"
                      value={moa.startTime}
                      onChange={onChange}
                      className="w-full text-main-500 rounded text-[0.9em] bg-mainBtn-disabled"
                      type="datetime-local"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 flex">
                <textarea
                  name="partyDescription"
                  value={updateMoa.partyDescription}
                  onChange={onChange}
                  className="w-full text-main-500 bg-createInput-gray rounded min-h-[10em] tablet:min-h-[13em]"
                  rows="10"
                  placeholder="모집 내용 쓰는 곳"
                ></textarea>
              </div>
              <div className="grid grid-flow-col mb-[1.2em]">
                <span className="col-span-1 flex items-center text-[0.9em]">음성 채팅 링크</span>
                <input
                  name="chatLink"
                  value={updateMoa.chatLink}
                  onChange={onChange}
                  className="col-span-11 text-main-500 bg-createInput-gray w-full rounded"
                  type="text"
                  id=""
                />
              </div>
              <div className="grid tablet:grid-flow-col grid-flow-row">
                <div className="col-span-1 tablet:text-[1em] text-[0.9em] mb-[0.5em]">파티 태그</div>
                <div>
                  <div className="grid grid-flow-col tablet:col-span-5">
                    {items.map((item, index) => (
                      <div key={index}>
                        <input
                          checked={
                            checkedList.includes(`${index + 1}`) ? true : false
                          }
                          onChange={onCheckedElement}
                          value={index + 1}
                          id={item}
                          name={item}
                          type="checkbox"
                          className="w-[0.9em] h-[0.9em] tablet:w-4 tablet:h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={item}
                          className="ml-[0.2em] tablet:ml-2 tablet:text-[0.95em] text-[0.8em] font-medium text-main-100"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          <div className="flex my-5">
            <div className="m-auto mt-[0.5em] mb-[3em]">
              <button
                onClick={handleCancel}
                className="w-32 h-12 mx-3 bg-mainBtn-blue hover:bg-mainBtn-blue-hover rounded-lg text-sm"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="w-32 h-12 mx-3 bg-moa-purple hover:bg-moa-purple-dark rounded-lg text-sm"
              >
                수정 완료
              </button>
            </div>
          </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MoaUpdate;
