import React, { memo, useEffect, useState, useRef } from "react";
import HeartIcon from "../../assets/icons/hearticon.svg";
import Heart from "../../assets/icons/heart.svg";
import moment from "moment";
import Forfeit from "../Modals/ForfeitModal/Forfeit";
import Exit from "../Modals/ExitModal/Exit";

// Import CSS for this component
import styles from "./spectatorsidebar.module.css";

// Import Adapters
import { sendComment } from "../../adapters/comments";

//import style-components
import {
  Chat,
  ChatInputForm,
  ChatWrapper,
  EmptyComment,
  ExitBtn,
  Sidebar,
  SidebarNav
} from "./SpectatorSidebarStyle";
import styled from "styled-components";

const SpectatorSideBar = ({ type, gameData }) => {
  const game_id = gameData._id;

  const [commentMsg, setCommentMsg] = useState("");
  const [commentsFromGameData] = useState(gameData.messages);

  const [isModalOpen, setmodalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

  const handleAddComment = () => {
    if (commentMsg.trim().length) {
      sendComment(game_id, commentMsg).then((response) => {
        if (!response.data.success) {
          // TODO: Handle error with Toasts
          console.log("Unable to send comment: ", response.data.message);
        } else {
          // Clear the comment message input
        }
      }, setCommentMsg(""));
    } else {
      // TODO: Handle error with Toasts
      console.log("CommentMsg is empty");
    }
  };

  const handleForfeitModal = () => {
    setmodalIsOpen(true);
  };

  const handleExitModal = () => {
    setIsOpen(true);
  };

  let comment_id = 0;

  // hearts animation
  const heartsArr = Array.from(new Array(15));
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (animate === true) {
      setTimeout(() => {
        setAnimate(false);
      }, 6500);
    }
  }, [animate]);

  return (
    <>
      <aside className={styles["side-bar"]}>
        <nav className={styles["side-bar-nav"]}>
          <div className={styles.navLink}>
            <h2>Comments</h2>
          </div>
          <a className="close">
            <svg
              className="closeIcon"
              width="22"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5L4.5 13.5"
                stroke="white"
                strokeWidth="2.56648"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 4.5L13.5 13.5"
                stroke="white"
                strokeWidth="2.56648"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>

        <div id={styles.chat}>
          <Exit isOpen={isOpen} setIsOpen={setIsOpen} gameData={gameData} />
          <Forfeit
            isModalOpen={isModalOpen}
            setmodalIsOpen={setmodalIsOpen}
            gameData={gameData}
          />

          <div className={styles.chatContainer}>
            {type !== "spectator" && gameData.status === 0 && (
              <ExitBtn onClick={handleExitModal}>Exit Game</ExitBtn>
            )}

            {type !== "spectator" && gameData.status === 1 && (
              <ExitBtn onClick={handleForfeitModal}>Forfeit Game</ExitBtn>
            )}

            <div className={styles.chatWrapperContainer}>
              {commentsFromGameData.length ? (
                <>
                  {commentsFromGameData.map(
                    ({ user_name, image_url, text, timestamp }) => {
                      return (
                        <div className={styles.chatWrapper} key={comment_id++}>
                          <div className={styles.specHead}>
                            <img
                              className={styles.specAvi}
                              src={image_url}
                              alt="avi"
                            />
                            <div className={styles.specInfo}>
                              <h2 className={styles.spectatorName}>
                                {user_name}
                              </h2>
                              <p className={styles["time-muted"]}>
                                {timestamp}
                              </p>
                            </div>
                          </div>
                          <div className={styles.specNameTime}>
                            <p className={styles.spectatorMessage}>{text}</p>
                          </div>
                        </div>
                      );
                    }
                  )}
                  {animate ? (
                    <div className={styles.heartContainer}>
                      {heartsArr.map((item, id) => (
                        <img src={Heart} alt="" key={`heart_${id+1}`} />
                      ))}
                    </div>
                  ) : null}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className={styles.emptyComment}>
                  <svg
                    className={styles.CommentBird}
                    width="329"
                    height="139"
                    viewBox="0 0 329 139"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M118.813 45.5898H0.0413818V84.5806H4.54044V94.7783L14.7379 84.5806H118.813V45.5898Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M115.514 49.3867H3.34058V80.5792H115.514V49.3867Z"
                        fill="white"
                      />
                      <path
                        d="M67.2692 58.7939H13.2607V60.433H67.2692V58.7939Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M107.393 64.4634H13.2607V66.1024H107.393V64.4634Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M107.301 70.1335H13.2607V71.7726H107.301V70.1335Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M199.555 133.662C199.555 133.662 200.121 121.799 211.727 123.177L199.555 133.662Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M196.275 122.372C199.483 122.372 202.084 119.772 202.084 116.563C202.084 113.355 199.483 110.755 196.275 110.755C193.067 110.755 190.467 113.355 190.467 116.563C190.467 119.772 193.067 122.372 196.275 122.372Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M196.97 126.345H195.33V137.823H196.97V126.345Z"
                        fill="#F0F0F0"
                      />
                      <path
                        d="M253.96 115.501C279.886 115.501 300.902 94.484 300.902 68.5584C300.902 42.6328 279.886 21.616 253.96 21.616C228.034 21.616 207.017 42.6328 207.017 68.5584C207.017 94.484 228.034 115.501 253.96 115.501Z"
                        fill="#3F3D56"
                      />
                      <path
                        d="M224.407 72.3267C225.573 70.9309 227.031 69.8082 228.678 69.0378C230.325 68.2674 232.122 67.8681 233.94 67.8681C235.759 67.8681 237.555 68.2674 239.203 69.0378C240.85 69.8082 242.308 70.9309 243.474 72.3267C245.449 70.4411 246.821 68.0122 247.416 65.347C248.01 62.6819 247.801 59.9002 246.815 57.3539C245.829 54.8075 244.11 52.6107 241.875 51.0413C239.641 49.472 236.991 48.6005 234.261 48.5372C231.531 48.4738 228.843 49.2214 226.538 50.6854C224.233 52.1494 222.414 54.2641 221.311 56.762C220.208 59.2599 219.87 62.0288 220.34 64.7187C220.811 67.4085 222.068 69.8985 223.954 71.8737C224.101 72.0281 224.252 72.1792 224.407 72.3267Z"
                        fill="white"
                      />
                      <path
                        d="M261.685 72.3267C262.85 70.931 264.309 69.8082 265.956 69.0378C267.603 68.2674 269.4 67.8681 271.218 67.8681C273.037 67.8681 274.833 68.2674 276.481 69.0378C278.128 69.8082 279.586 70.931 280.752 72.3267C282.727 70.4411 284.099 68.0122 284.693 65.347C285.288 62.6819 285.079 59.9003 284.093 57.3539C283.107 54.8075 281.388 52.6107 279.153 51.0413C276.918 49.472 274.269 48.6005 271.539 48.5372C268.809 48.4738 266.121 49.2214 263.816 50.6854C261.511 52.1494 259.692 54.2641 258.589 56.762C257.485 59.2599 257.148 62.0288 257.618 64.7187C258.089 67.4085 259.346 69.8985 261.232 71.8737C261.379 72.0281 261.53 72.1792 261.685 72.3267Z"
                        fill="white"
                      />
                      <path
                        d="M229.231 62.3883C231.854 62.3883 233.98 60.262 233.98 57.639C233.98 55.016 231.854 52.8896 229.231 52.8896C226.608 52.8896 224.481 55.016 224.481 57.639C224.481 60.262 226.608 62.3883 229.231 62.3883Z"
                        fill="#3F3D56"
                      />
                      <path
                        d="M266.507 62.3883C269.13 62.3883 271.256 60.262 271.256 57.639C271.256 55.016 269.13 52.8896 266.507 52.8896C263.884 52.8896 261.758 55.016 261.758 57.639C261.758 60.262 263.884 62.3883 266.507 62.3883Z"
                        fill="#3F3D56"
                      />
                      <path
                        d="M220.134 85.8168C223.184 85.8168 225.656 83.3442 225.656 80.2941C225.656 77.2441 223.184 74.7715 220.134 74.7715C217.084 74.7715 214.611 77.2441 214.611 80.2941C214.611 83.3442 217.084 85.8168 220.134 85.8168Z"
                        fill="#00B87C"
                      />
                      <path
                        d="M283.644 85.8168C286.694 85.8168 289.167 83.3442 289.167 80.2941C289.167 77.2441 286.694 74.7715 283.644 74.7715C280.594 74.7715 278.122 77.2441 278.122 80.2941C278.122 83.3442 280.594 85.8168 283.644 85.8168Z"
                        fill="#00B87C"
                      />
                      <path
                        d="M251.889 69.2485L247.747 87.1972L254.65 80.2942L251.889 69.2485Z"
                        fill="#00B87C"
                      />
                      <path
                        d="M273.172 138.282L268.469 134.335L268.579 138.282H267.118L267.001 134.109L260.652 138.282H257.994L266.954 132.393L266.607 120.027L266.348 110.688L267.805 110.648L268.068 120.027L268.414 132.382L275.442 138.282H273.172Z"
                        fill="#3F3D56"
                      />
                      <path
                        d="M251.079 138.282L246.377 134.335L246.486 138.282H245.03L244.913 134.109L238.564 138.282H235.906L244.862 132.393L244.515 120.027L244.256 110.688L245.716 110.648L245.979 120.027L246.322 132.382L253.35 138.282H251.079Z"
                        fill="#3F3D56"
                      />
                      <path
                        d="M254.65 18.1645C253.362 18.1645 252.226 19.165 251.466 20.7018C250.797 18.3909 249.39 16.7838 247.747 16.7838C247.635 16.7949 247.525 16.8135 247.415 16.8395C246.784 14.3722 245.316 12.6418 243.605 12.6418C241.317 12.6418 239.463 15.7326 239.463 19.5452C239.463 23.3577 241.317 26.4485 243.605 26.4485C243.717 26.4374 243.827 26.4187 243.937 26.3928C244.568 28.8601 246.036 30.5904 247.747 30.5904C249.035 30.5904 250.171 29.5899 250.931 28.0531C251.601 30.364 253.007 31.9711 254.65 31.9711C256.938 31.9711 258.792 28.8803 258.792 25.0678C258.792 21.2552 256.938 18.1645 254.65 18.1645Z"
                        fill="#3F3D56"
                      />
                      <path
                        d="M209.701 70.0191L183.842 65.8248C182.539 65.6135 181.212 65.4017 179.905 65.5856C178.598 65.7696 177.289 66.4132 176.623 67.5528C176.302 68.1005 176.147 68.729 176.175 69.3628C176.204 69.9967 176.415 70.6088 176.783 71.1256C177.151 71.6425 177.66 72.0421 178.25 72.2764C178.839 72.5107 179.484 72.5697 180.106 72.4463C178.695 72.4005 177.211 72.3703 175.959 73.0226C174.706 73.675 173.819 75.2596 174.43 76.533C174.613 76.8845 174.861 77.1982 175.16 77.4578C176.103 78.3027 177.266 78.8634 178.514 79.075C179.762 79.2867 181.044 79.1406 182.213 78.6537C181.261 80.019 179.372 80.2217 177.737 80.5378C176.103 80.8539 174.214 81.7782 174.154 83.4415C174.085 85.3104 176.31 86.3037 178.141 86.6841C187.918 88.6959 198.066 87.8687 207.388 84.3003C208.436 83.9397 209.428 83.4334 210.334 82.7962C211.35 82.0247 212.122 80.9768 212.558 79.7779C212.994 78.5791 213.075 77.28 212.791 76.0362C212.508 74.7924 211.872 73.6566 210.96 72.7648C210.048 71.8729 208.898 71.2629 207.648 71.0076"
                        fill="#3F3D56"
                      />
                      <path
                        d="M321.318 91.215C317.05 82.1916 310.29 74.5774 301.835 69.2711C300.917 68.6504 299.917 68.1621 298.863 67.8206C297.636 67.4723 296.334 67.4849 295.114 67.8571C293.894 68.2293 292.807 68.9452 291.983 69.9192C291.159 70.8931 290.633 72.0838 290.469 73.3488C290.304 74.6138 290.507 75.8994 291.054 77.0518L289.031 76.0051C293.094 83.7348 297.157 91.4644 301.219 99.1941C301.834 100.363 302.462 101.55 303.394 102.485C304.327 103.419 305.628 104.078 306.939 103.926C307.46 103.867 307.959 103.685 308.394 103.394C308.83 103.103 309.189 102.711 309.442 102.252C309.695 101.794 309.834 101.281 309.847 100.757C309.861 100.234 309.749 99.7143 309.52 99.2429C310.091 100.047 310.84 100.706 311.71 101.169C312.984 101.778 314.784 101.535 315.435 100.282C315.605 99.9239 315.707 99.5372 315.735 99.1418C315.843 97.8806 315.593 96.6144 315.012 95.4897C314.431 94.365 313.544 93.4278 312.452 92.7865C314.116 92.7269 315.413 94.1149 316.648 95.231C317.882 96.3471 319.756 97.3014 321.122 96.3504C322.657 95.2817 322.114 92.9071 321.318 91.215Z"
                        fill="#3F3D56"
                      />
                      <path
                        d="M21.2697 -0.000244141H192.69V56.274H186.196V70.9914L171.479 56.274H21.2697V-0.000244141Z"
                        fill="#CACACA"
                      />
                      <path
                        d="M187.928 5.47974H26.0312V50.4991H187.928V5.47974Z"
                        fill="white"
                      />
                      <path
                        d="M116.999 18.6233H39.0503V20.9889H116.999V18.6233Z"
                        fill="#00B87C"
                      />
                      <path
                        d="M174.909 26.8064H39.0503V29.172H174.909V26.8064Z"
                        fill="#00B87C"
                      />
                      <path
                        d="M174.776 34.9897H39.0503V37.3553H174.776V34.9897Z"
                        fill="#00B87C"
                      />
                      <path
                        d="M328.578 138.663H183.521C183.42 138.663 183.323 138.622 183.252 138.551C183.18 138.48 183.14 138.383 183.14 138.282C183.14 138.181 183.18 138.084 183.252 138.013C183.323 137.941 183.42 137.901 183.521 137.901H328.578C328.679 137.901 328.776 137.941 328.847 138.013C328.919 138.084 328.959 138.181 328.959 138.282C328.959 138.383 328.919 138.48 328.847 138.551C328.776 138.622 328.679 138.663 328.578 138.663Z"
                        fill="#CACACA"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width="328.917"
                          height="138.663"
                          fill="white"
                          transform="translate(0.0413818)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <h3>It's Quiet Here!</h3>
                  <p>You can make a comment at any point.</p>
                </div>
              )}
            </div>

            {type === "spectator" ? (
              <div className={styles.chatInputForm}>
                <input
                  type="text"
                  value={commentMsg}
                  onChange={(e) => setCommentMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Send a comment"
                />
                <div
                  className={styles.heartIcon}
                  onClick={() => setAnimate(true)}
                >
                  <img src={HeartIcon} alt="_heart_" />
                  <span>16</span>
                </div>
                <div className={styles.inputIcons}>
                  <div className={styles.inputIconsleft}>
                    <svg
                      className={styles.feather}
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.27683 1.40774C9.43311 1.47557 9.52596 1.63832 9.50483 1.80737L8.93472 6.36819H14.1162C14.2651 6.36819 14.4006 6.45433 14.4637 6.58918C14.5269 6.72403 14.5064 6.88325 14.411 6.99765L8.17079 14.4859C8.06172 14.6168 7.87943 14.6601 7.72315 14.5923C7.56687 14.5244 7.47403 14.3617 7.49516 14.1926L8.06526 9.63183H2.88378C2.73487 9.63183 2.5994 9.54569 2.53624 9.41084C2.47308 9.27598 2.49362 9.11677 2.58896 9.00237L8.82919 1.51409C8.93826 1.38321 9.12055 1.3399 9.27683 1.40774ZM3.70315 8.86428H8.49999C8.61007 8.86428 8.71485 8.91155 8.7877 8.99407C8.86055 9.0766 8.89446 9.18643 8.8808 9.29566L8.41914 12.989L13.2968 7.13574H8.49999C8.38991 7.13574 8.28513 7.08847 8.21228 7.00594C8.13943 6.92342 8.10553 6.81359 8.11918 6.70436L8.58084 3.01105L3.70315 8.86428Z"
                        fill="rgb(224, 223, 224)"
                      />
                    </svg>

                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.87988 2.33341C2.87988 2.03696 3.12021 1.79663 3.41666 1.79663H8.08333C9.66845 1.79663 10.9534 3.08162 10.9534 4.66674C10.9534 6.25186 9.66845 7.53686 8.08333 7.53686H3.41666C3.12021 7.53686 2.87988 7.29653 2.87988 7.00008V2.33341ZM3.95344 2.87019V6.4633H8.08333C9.07554 6.4633 9.87988 5.65895 9.87988 4.66674C9.87988 3.67453 9.07554 2.87019 8.08333 2.87019H3.95344Z"
                        fill="rgb(224, 223, 224)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.87988 6.99991C2.87988 6.70346 3.12021 6.46313 3.41666 6.46313H8.66666C10.2518 6.46313 11.5368 7.74813 11.5368 9.33325C11.5368 10.9184 10.2518 12.2034 8.66666 12.2034H3.41666C3.12021 12.2034 2.87988 11.963 2.87988 11.6666V6.99991ZM3.95344 7.53669V11.1298H8.66666C9.65887 11.1298 10.4632 10.3255 10.4632 9.33325C10.4632 8.34104 9.65887 7.53669 8.66666 7.53669H3.95344Z"
                        fill="rgb(224, 223, 224)"
                      />
                    </svg>

                    <svg
                      className={styles.svgNotneeded}
                      width="18"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.2499 3H7.49988"
                        stroke="rgb(224, 223, 224)"
                        strokeWidth="1.22693"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.4999 15H3.74988"
                        stroke="rgb(224, 223, 224)"
                        strokeWidth="1.22693"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.2499 3L6.74988 15"
                        stroke="rgb(224, 223, 224)"
                        strokeWidth="1.22693"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <svg
                      className={styles.svgNomargin}
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.94913 2.12448C10.4659 0.60639 12.8768 0.6281 14.3678 2.17327C15.8589 3.71844 15.8798 6.21688 14.4149 7.78867L14.4077 7.79645L12.4489 9.82621C12.4489 9.82623 12.4489 9.82618 12.4489 9.82621C11.656 10.6481 10.5576 11.0728 9.43895 10.9898C8.32026 10.9067 7.29153 10.3243 6.61974 9.39358C6.42098 9.11822 6.47526 8.72802 6.74098 8.52205C7.00669 8.31608 7.38322 8.37233 7.58198 8.64769C8.04493 9.28907 8.75386 9.69045 9.52479 9.74767C10.2957 9.80489 11.0526 9.51229 11.599 8.94583L13.554 6.91986C14.5601 5.83647 14.5445 4.11742 13.5181 3.05381C12.4916 1.98999 10.8323 1.97405 9.7869 3.01721L8.66709 4.17092C8.43177 4.41336 8.05136 4.41221 7.8174 4.16835C7.58345 3.92449 7.58456 3.53026 7.81988 3.28782L8.94913 2.12448Z"
                        fill="rgb(224, 223, 224)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.5512 6.17371C5.3441 5.35177 6.4424 4.92722 7.56105 5.01025C8.67974 5.09327 9.70847 5.67572 10.3803 6.60642C10.579 6.88178 10.5247 7.27197 10.259 7.47794C9.99331 7.68391 9.61678 7.62766 9.41802 7.3523C8.95507 6.71093 8.24614 6.30954 7.47521 6.25233C6.70429 6.19511 5.94739 6.4877 5.40097 7.05417L3.44597 9.08012C2.43993 10.1635 2.4555 11.8826 3.48186 12.9462C4.50822 14.0098 6.16706 14.0259 7.2125 12.9834L8.32514 11.8303C8.55977 11.5872 8.94019 11.5872 9.17483 11.8303C9.40946 12.0735 9.40946 12.4677 9.17483 12.7109L8.05093 13.8756C6.5342 15.3936 4.12322 15.3719 2.63217 13.8267C1.14113 12.2815 1.12018 9.7831 2.58509 8.21132L2.59234 8.20354L4.5512 6.17371C4.55117 6.17374 4.55122 6.17369 4.5512 6.17371Z"
                        fill="rgb(224, 223, 224)"
                      />
                    </svg>

                    <svg
                      className={styles.svgNotneeded}
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.05688 3.74999C5.05688 3.47992 5.27582 3.26099 5.54589 3.26099H13.7457C14.0157 3.26099 14.2347 3.47992 14.2347 3.74999C14.2347 4.02006 14.0157 4.23899 13.7457 4.23899H5.54589C5.27582 4.23899 5.05688 4.02006 5.05688 3.74999Z"
                        fill="rgb(224, 223, 224)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.05688 7.49999C5.05688 7.22992 5.27582 7.01099 5.54589 7.01099H13.7457C14.0157 7.01099 14.2347 7.22992 14.2347 7.49999C14.2347 7.77006 14.0157 7.98899 13.7457 7.98899H5.54589C5.27582 7.98899 5.05688 7.77006 5.05688 7.49999Z"
                        fill="rgb(224, 223, 224)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.05688 11.25C5.05688 10.9799 5.27582 10.761 5.54589 10.761H13.7457C14.0157 10.761 14.2347 10.9799 14.2347 11.25C14.2347 11.5201 14.0157 11.739 13.7457 11.739H5.54589C5.27582 11.739 5.05688 11.5201 5.05688 11.25Z"
                        fill="rgb(224, 223, 224)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.51172 3.74999C3.51172 3.47992 3.29278 3.26099 3.02272 3.26099H2.39196C2.1219 3.26099 1.90296 3.47992 1.90296 3.74999C1.90296 4.02006 2.1219 4.23899 2.39196 4.23899H3.02272C3.29278 4.23899 3.51172 4.02006 3.51172 3.74999Z"
                        fill="rgb(224, 223, 224)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.51172 7.49999C3.51172 7.22992 3.29278 7.01099 3.02272 7.01099H2.39196C2.1219 7.01099 1.90296 7.22992 1.90296 7.49999C1.90296 7.77006 2.1219 7.98899 2.39196 7.98899H3.02272C3.29278 7.98899 3.51172 7.77006 3.51172 7.49999Z"
                        fill="rgb(224, 223, 224)"
                      />
                      <path
                        d="M3.02295 11.25H2.3922"
                        stroke="rgb(224, 223, 224)"
                        strokeWidth="0.978006"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.inputIconsright}>
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.2734 8.07345C11.2734 9.61914 10.0317 10.8722 8.50011 10.8722C6.96849 10.8722 5.72686 9.61914 5.72686 8.07345C5.72686 6.52776 6.96849 5.27473 8.50011 5.27473C10.0317 5.27473 11.2734 6.52776 11.2734 8.07345ZM11.2734 8.07345L11.2734 8.77313C11.2734 9.9324 12.2047 10.8722 13.3534 10.8722C14.5021 10.8722 15.4333 9.9324 15.4333 8.77313V8.07345C15.4331 4.82198 13.2134 1.99913 10.0758 1.26019C6.93825 0.521243 3.70973 2.06096 2.28343 4.97648C0.85713 7.892 1.60897 11.4149 4.09809 13.4794C6.5872 15.5438 10.1576 15.6058 12.7155 13.6289"
                        stroke="rgb(224, 223, 224)"
                        strokeWidth="0.941892"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.7921 7.77473L8.66548 13.9014C7.10251 15.4644 4.56844 15.4644 3.00548 13.9014C1.44251 12.3384 1.44251 9.80437 3.00548 8.2414L9.13214 2.11473C10.1741 1.07276 11.8635 1.07276 12.9055 2.11473C13.9475 3.15671 13.9475 4.84609 12.9055 5.88807L6.77214 12.0147C6.25115 12.5357 5.40647 12.5357 4.88548 12.0147C4.36449 11.4937 4.36449 10.6491 4.88548 10.1281L10.5455 4.47473"
                        stroke="rgb(224, 223, 224)"
                        strokeWidth="0.941892"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <svg
                      className={styles["submit"]}
                      onClick={handleAddComment}
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="rgba(97, 96, 97, 1)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.125 9.375L1.875 14.625L4.875 9.375L1.875 4.125L16.125 9.375Z"
                        stroke="#333333"
                        strokeWidth="1.22693"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <svg
                      className={styles["icon-down"]}
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.49988 6.75L8.99988 11.25L13.4999 6.75"
                        stroke="rgb(224, 223, 224)"
                        strokeWidth="1.22693"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
};

export default React.memo(SpectatorSideBar);
