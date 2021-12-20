### 설치 및 프로젝트 실행 방법
1. 프로젝트를 디렉토리에서 아래의 커맨드를 입력합니다.
  > `$ git clone https://github.com/kadiace/semi-classum.git`
2. 프로젝트의 최상위 디렉토리에 위치한 `app.module.ts` 파일의 `TypeOrmModule.forRoot({})` 부분 속 mysql 세팅을 컴퓨터의 mysql 서버에 맞게 조정해줍니다.
    1. 이 때 db 이름은 'semi-classum-db' 로 만들어주셔야 프로젝트와 연동이 가능합니다.
    2. db 이름만 동일하다면 테이블은 자동으로 생성됩니다. 
4. 해당 프로젝트는 hot-reload 기능을 갖추고 있습니다. 프로젝트를 실행시키기 위한 패키지를 모두 다운로드 받으신 뒤, `$ npm run start:dev` 커맨드를 입력해 프로젝트를 실행시키시면 됩니다.
5. postman을 통해 데이터 입출력을 확인하기 위해 `http://localhost:3000 + “controller”` 를 입력하시면 됩니다. 예를 들어, 새로운 유저를 생성하고 싶으시다면 POST 옵션,  `http://localhost:3000/user` 도메인으로 JSON파일 `{"email": “example@gmail.com”, "lastname": “example”, "firstname": “example”, "profile": “example”}`을 body에 넣어 request를 보내시면 됩니다.
6. 자세한 컨트롤러 옵션은 각 테이블을 지칭하는 디렉토리 (user, space, userspace, post, chat, like) 의 `*.controller.ts` 를 확인하시면 됩니다.
7. 이 외에 여쭤보실 사항이 있으시다면 `Gmail: rlacjfghks95@gmail.com, KAIST mail: maxwell98@kaist.ac.kr` 로 언제든지 연락주세요. 감사합니다 :)
