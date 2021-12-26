### 설치 및 프로젝트 실행 방법
1. 프로젝트를 로컬에 설치하기 위해 디렉토리에서 다음의 커맨드를 입력합니다.
    `$ git clone https://github.com/kadiace/semi-classum.git`
2. 프로젝트의 최상위 디렉토리에 위치한 `app.module.ts` 파일의 `TypeOrmModule.forRoot({})` 부분 속 mysql 세팅을 컴퓨터의 mysql 서버에 맞게 조정해줍니다.
    1. 이 때 db 이름은 'semi-classum-dev'(dev) 혹은 'semi-classum-db'(prod) 로 만들어주셔야 프로젝트와 연동이 가능합니다.
    2. db 이름만 동일하다면 테이블은 자동으로 생성됩니다.
3. 이 프로젝트는 프로그램 실행 커맨드에 따라 다른 이름으로 설정된 Db와 연동되도록 설정되어있습니다. `$ npm run start:dev` 혹은 `$ npm run start:prod` 커맨드를 입력해 프로젝트를 실행시키시면 됩니다.
4. Authentication을 위한 기능이 app.controler.ts, auth 디렉토리에 걸쳐 구현되어 있습니다.
    1. Body에 username, password 를 입력 후 `http://localhost:3000/auth/login`를 전송하면 cookies에 Authentication, Refresh 두 개의 token이 생성됩니다. 
    2. Authentication token이 유효한 동안에는 `http://localhost:3000/profile`을 전송해 로그인 된 유저의 정보를 얻을 수 있습니다.
    3. Refresh token이 유효한 동안에는 `http://localhost:3000/auth/refresh`을 전송해 새로운 Authentication token을 받아올 수 있습니다.
    4. Refresh token이 유효한 동안에는 `http://localhost:3000/auth/logout`을 전송해 cookies에 저장되어있는 두 토큰을 없애 로그아웃의 역할을 수행합니다.
    5. Refresh token이 유효하지 않다면 logout된 것으로 간주할 수 있습니다. 다시 로그인이 필요합니다.
5. postman을 통해 데이터 입출력을 확인하기 위해 `http://localhost:3000 + “controller”` 를 입력하시면 됩니다. 예를 들어, 새로운 유저를 생성하고 싶으시다면 POST 옵션,  `http://localhost:3000/user` 도메인으로 JSON파일 `{"email": “example@gmail.com”, "lastname": “example”, "firstname": “example”, "profile": “example”}`을 body에 넣어 request를 보내시면 됩니다.
6. user, space, userspace, post Table은 soft delete가 구현되어 있는 상태입니다. 
    1. 각 컨트롤러의 조건에 맞게 url을 전송하시면 삭제되고, 복구되는 것을 확인하실 수 있습니다. (deleteAt Column이 null이 아닌 삭제 요청 시간이면 삭제 취급.)
    2. 삭제된 상태일 경우 {withDelete: true} 옵션 없이 찾을 수 없습니다.
    3. 자신의 key를 외래 키로 넘겨주고 있는 모든 tuple에 대해서 soft delete가 발생합니다.

        (ex. 특정 user 삭제 시 user가 관리중이던 모든 space, 해당 space들이 소유하고 있던 모든 post, user가 소속되어 있던 모든 space들 역시 삭제가 일어납니다.)
8. 자세한 컨트롤러 옵션은 각 테이블을 지칭하는 디렉토리 (user, space, userspace, post, chat, like) 의 `*.controller.ts` 를 확인하시면 됩니다.
9. 이 외에 여쭤보실 사항이 있으시다면 `Gmail: rlacjfghks95@gmail.com, KAIST mail: maxwell98@kaist.ac.kr` 로 언제든지 연락주세요. 감사합니다 :)
