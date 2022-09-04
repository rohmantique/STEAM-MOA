# ReadMe


## 💡 서비스 소개

**스팀 API 활용 스팀 게임 큐레이팅 & 화상 채팅 서비스**

> 스팀에서는 게임을 구매해도, 멀티 플레이 게임을 함께 할 파티원은 구할 수 없습니다.<br>
스팀모아는 멀티 게임 플레이어가 게임을 고르고 파티원을 모집할 수 있도록 돕는 서비스입니다.

**스팀모아에서 즐겁게 게임을 함께할 사람들을 모아보세요!**

## 🛠️ 기술 스택
<div align=center> 
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">  
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> 
  <img src="https://img.shields.io/badge/springSecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> 
  <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"> 
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white"> 
  <br>

  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/openid-F78C40?style=for-the-badge&logo=openid&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/notion-CA4245?style=for-the-badge&logo=notion&logoColor=white">
  <br>
</div>

<details>
<summary>상세 기술스택 및 버전</summary>

| 구분 | 기술스택 | 상세 | 버전 |  
| --- | --- | --- | --- | 
| 공통 | 형상관리 | Gitlab | - |  
|  | 이슈관리 | Jira | - |  
|  | 커뮤니케이션 | Matamost, Notion | - |  
| Front-end | HTML5 |  | - |  
|  | CSS3 |  | - |  
|  |  | postcss | 8.4.14 |  
|  |  | tailwindcss | 3.1.6 |  
|  | JavaScript(ES6) |  | - |  
|  | React | React | 17.0.2 | 
|  |  | react-router-dom | 6.3.0 |  
|  |  | recoil | 0.7.4 |  
|  |  | openvidu-browser | 2.22.0 |  
|  |  | axios | 0.27.2 |  
|  |  | jwt-decode | 3.1.2 |  
|  |  | sweetalert2 | 11.4.26 |  
|  |  | lodash | 4.17.21 |  
|  |  | @fontawesome | 6.1.2 |  
|  | IDE | VisualStudioCode | 1.69.2 |  
| Back-end | Java | JDK | 1.8.0_192 |  
|  | SpringBoot | springboot | 2.7.1 |  
|  |  | Gradle | 7.5 |  
|  |  | SpringSecurity | - |  
|  |  | querydsl | - |  
|  |  | jpa | - |  
|  | API관리 | Swagger | 2.9.2 |  
|  | jwt |  | 3.10.3 |  
|  | jsonwebtoken |  | 1.1.1 |  
|  | DB | MySQL | 8.0.30-0ubuntu0.20.04.2 |  
|  | IDE | IntelliJ Ultimate | - |  
</details>

## 🗃️ 프로젝트 구조

### 🏗️ 서비스 구조
![스크린샷 2022-08-23 오전 11.37.32.png](ReadMe%208118f36887da4163b0ce9d919fa5ba90/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-08-23_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_11.37.32.png)

### 📂 파일 구조

**Front-End**

![Untitled](ReadMe%208118f36887da4163b0ce9d919fa5ba90/Untitled.png)

**Back-End**

![Untitled](ReadMe%208118f36887da4163b0ce9d919fa5ba90/Untitled%201.png)
## 🔗****Database Modeling****

![Untitled](ReadMe%208118f36887da4163b0ce9d919fa5ba90/Untitled%202.png)

## 💻 주요 기능 및 데모 영상

### **모아존 - 파티 참여**

- ‘모임의 진행 상태’와 ‘게임 이름’으로 원하는 파티를 검색할 수 있습니다.
- 내가 참여 중인 파티 중 '게임 중'인 파티가 있다면 ‘화상 채팅' 버튼이 활성화됩니다.
- 버튼을 누르면 화상 채팅에 참여할 수 있습니다.

![모아존-파티참여.gif](ReadMe%208118f36887da4163b0ce9d919fa5ba90/%25EB%25AA%25A8%25EC%2595%2584%25EC%25A1%25B4-%25ED%258C%258C%25ED%258B%25B0%25EC%25B0%25B8%25EC%2597%25AC.gif)

### **모아존 - 파티 만들기**

- 게임을 함께 할 파티원을 구하는 글을 작성할 수 있습니다.
- 파티 글은 수정과 삭제가 가능합니다.
- 파티의 모집 상태, 파티 태그에 필터를 걸어 파티 글을 검색할 수 있습니다.
- 파티 글은 정렬이 가능합니다.

![모아존-파티-만들기_파티-검색.gif](ReadMe%208118f36887da4163b0ce9d919fa5ba90/%25EB%25AA%25A8%25EC%2595%2584%25EC%25A1%25B4-%25ED%258C%258C%25ED%258B%25B0-%25EB%25A7%258C%25EB%2593%25A4%25EA%25B8%25B0_%25ED%258C%258C%25ED%258B%25B0-%25EA%25B2%2580%25EC%2583%2589.gif)

### **마이페이지**

- 비밀번호 본인 인증 후 (5회 이상 인증 실패 시 메인 페이지로 이동) 회원 정보를 수정할 수 있습니다.
- 내가 쓴 글과 나의 파티 정보, 팔로우 목록을 확인할 수 있습니다.
- 게임이 완료된 파티 글에 들어가면 파티원에 대한 평가를 진행할 수 있습니다.
- 파티원 평가 결과는 사용자의 매너 온도와 티어에 반영됩니다.

![마이페이지.gif](ReadMe%208118f36887da4163b0ce9d919fa5ba90/%25EB%25A7%2588%25EC%259D%25B4%25ED%258E%2598%25EC%259D%25B4%25EC%25A7%2580.gif)

### **게임모아**

- 전체 게임을 조회하거나 검색, 필터를 통해 원하는 게임만 조회할 수 있습니다.
- 스팀모아 사용자들의 게임 리뷰와 별점을 확인하고 직접 작성, 삭제할 수 있습니다.
- 다른 사용자가 작성한 공략 글을 참고하거나 직접 작성, 수정, 삭제가 가능합니다.

![게임모아-검색_리뷰글_공략글.gif](ReadMe%208118f36887da4163b0ce9d919fa5ba90/%25EA%25B2%258C%25EC%259E%2584%25EB%25AA%25A8%25EC%2595%2584-%25EA%25B2%2580%25EC%2583%2589_%25EB%25A6%25AC%25EB%25B7%25B0%25EA%25B8%2580_%25EA%25B3%25B5%25EB%259E%25B5%25EA%25B8%2580.gif)

### **통합검색**

- 검색어가 포함된 게임에 대해 파티, 게임, 공략 글 정보를 검색해 조회할 수 있습니다.
- '더보기' 버튼을 클릭해 더 많은 검색 결과를 확인할 수 있습니다.
- '@' 키워드를 사용해 사용자를 검색할 수 있습니다.

![통합검색.gif](ReadMe%208118f36887da4163b0ce9d919fa5ba90/%25ED%2586%25B5%25ED%2595%25A9%25EA%25B2%2580%25EC%2583%2589.gif)

### **반응형**

- 반응형 웹으로 구현되어 어떤 디바이스에서도 원활한 서비스를 경험할 수 있습니다.

![반응형.gif](ReadMe%208118f36887da4163b0ce9d919fa5ba90/%25EB%25B0%2598%25EC%259D%2591%25ED%2598%2595.gif)

## 🎥 UCC 보러 가기

[[SSAFY 공통 프로젝트] 스팀모아 서비스 소개 영상](https://www.youtube.com/watch?v=jqCjCKxyFKE)

## 🗣️ 협업 관리

**Jira BurnDown Chart**

![Untitled](ReadMe%208118f36887da4163b0ce9d919fa5ba90/Untitled%203.png)

---

**Notion**

![Untitled](ReadMe%208118f36887da4163b0ce9d919fa5ba90/Untitled%204.png)

## 👩‍👩‍👧 개발 멤버 소개

![Untitled](ReadMe%208118f36887da4163b0ce9d919fa5ba90/Untitled%205.png)

## 📅 프로젝트 기간

### 22.07.05 ~ 22.08.19

- **기획 및 설계** : 22.07.05 ~ 22.07.15
- **프로젝트 구현** : 22.07.16 ~ 22.08.15
- **버그 수정 및 산출물 정리** : 22.08.16 ~ 22.08.19

## 📄 프로젝트 관련 문서

| 구분 | 링크 |
| --- | --- |
| 게임 데이터 통계 | [통계 보러 가기](https://www.notion.so/SteamMoa-DB-8393ef6ec36843259b5a584c9068ebd3) |
| 원페이퍼 기획서 | [기획서 보러 가기](https://www.notion.so/2b5d913f760d4d05ada36b25f1e3e268) |
| 기능 정의서 | [기능 정의서 보러 가기](https://docs.google.com/spreadsheets/d/1WfJoLFtwinLhnWlKR11bC-UEMn59IrG46p22vAHViIw/edit#gid=1408271660)|
| 와이어 프레임(디자인) | [와이어프레임 보러 가기](https://www.figma.com/file/Zrl14ZgPRxZdzvOj1vSIpC/Untitled) |
| API 정의서 | [API 정의서 보러 가기](https://www.notion.so/a8af2ba49b1b47f5b281d92ba527af9a) |
| 빌드/배포 | [빌드/배포 보러 가기](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A303/-/blob/c476de65f5d1eea007ffd5fd4b6b7a8d126a1c48/exec/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_%ED%8F%AC%ED%8C%85%EB%A7%A4%EB%89%B4%EC%96%BC.docx) |
| 시연 시나리오 | [시연 시나리오 보러 가기](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A303/-/blob/c476de65f5d1eea007ffd5fd4b6b7a8d126a1c48/exec/%EC%8A%A4%ED%8C%80%20%EB%AA%A8%EC%95%84%20%EC%8B%9C%EC%97%B0%20%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4.pdf) |
| 발표 자료 | [발표 자료 보러 가기](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A303/-/blob/c476de65f5d1eea007ffd5fd4b6b7a8d126a1c48/Presentation/%EC%84%9C%EC%9A%B8_3%EB%B0%98_A303_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf)  |
