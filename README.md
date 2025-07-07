## 📌 서비스 소개 (PINBACK)

<img src="https://github.com/user-attachments/assets/15417492-3d09-4344-8500-a172565c40d1" width="200" alt="PinBack Logo"/>

### 📍 “저장해둔 정보를 다시 꺼내볼 수 있도록 도와주는 정보 리마인드 웹 서비스"

> PinBack은 서비스의 핵심 키워드인 Pin(북마크-핀)과 Back(다시)을 결합한 이름으로,
> **저장**까지만 도와주는 보통의 정보 저장 툴과 다르게
> **저장 후** 정보를 다시 꺼내보는 **활용**까지 사용자를 도와주는 서비스 입니다.

<br/>
<br/>

<br/>

## 📌 PINBACK의 웨비들을 소개합니다!

<div align="center">
  <img src="https://github.com/user-attachments/assets/c51bd5f1-4346-456d-bc96-8804af48cb38" width="400" />
</div>

<br />

   <div align="center">
     
| <img src="https://avatars.githubusercontent.com/u/117571282?v=4" width="150" alt="프로필사진"> | <img src="https://avatars.githubusercontent.com/u/101315059?v=4" width="150" alt="프로필사진">  | <img src="https://avatars.githubusercontent.com/u/165611407?v=4" width="150" alt="프로필사진"> |  <img src="https://avatars.githubusercontent.com/u/163228804?v=4" width="150" alt="프로필사진">  |  
| :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|                            <div align = "center"><b>이진혁</b></div>                            |                            <div align = "center"><b>이재림</b></div>                            |                            <div align = "center"><b>최서희</b></div>                            |                             <div align = "center"><b>김정민</b></div>                          
|                           [@constantly-dev](https://github.com/constantly-dev)                            |                [@jllee000](https://github.com/jllee000)                                 |                       [@karnelll](https://github.com/karnelll)                        |                        [@jjangminii](https://github.com/jjangminii)   |

</div>

<br />
<br/>

## 📌 기술 스택 및 선정 이유 (Tech Stack)

> 모든 기술에 정답은 없다. 다른 팀을 따라할 이유도 없다.
> `trade-off` 사이에서 팀에 `fit`한 근거만 있으면 그것이 정답이다.

<br/>

### 📍 도입 근거

| 스택                             | 근거                                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| monorepo + turborepo             | 모노레포를 pinback에서 도입한 이유 (아티클 추가 예정)                                                                                                |
| tailwind css                     | [많은 css라이브러리 중 왜 tailwind인가?](https://reminiscent-tugboat-71f.notion.site/css-tailwind-226688191681800b9675c456b2290455?source=copy_link) |
| Biome -> Eslint + Prettier       | [Biome에서 ESLint + Prettier로 전환한 이유](https://reminiscent-tugboat-71f.notion.site/Biome-ESLint-Prettier-226688191681801b8013da5b339c1d63)      |
| coderabbit                       | [coderabbit 도입 이유와 세팅 방식](https://reminiscent-tugboat-71f.notion.site/coderabbit-22368819168180c7aee7e4db318b69f4?source=copy_link)         |
| vercel -> aws / cloudfront / ETC | vercel에서 배포 파이프라인을 @@으로 변경한 이유 (개발 이후 적합한 파이프라인 선택 이후 추가 예정)                                                    |

<br/>

### 📍 도입 기술 스택

| 역할                        | 스택                                                                                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **UI Library**              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                 |
| **Language**                | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                  |
| **Styling**                 | ![tailwindcss](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black)                                                                                               |
| **Data Fetching**           | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)                                                                                                                 |
| **Server State management** | ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=React%20Query&logoColor=white)                                                                                     |
| **UI Test**                 | ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white)                                                                                                     |
| **Repository Management**   | ![Monorepo](https://img.shields.io/badge/Monorepo-000000?style=for-the-badge&logo=Monorepo&logoColor=white)                                                                                                        |
| **Build System**            | ![Turborepo](https://img.shields.io/badge/Turborepo-FF1E56?style=for-the-badge&logo=Turborepo&logoColor=white)                                                                                                     |
| **Formatting**              | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) |
| **Package Manager**         | ![Pnpm](https://img.shields.io/badge/Pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)                                                                                                                    |
| **Version Control**         | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)   |
| **Deployment (초기 ver1)**  | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                              |
| **Deployment (ver2)**       | 개발을 진행하면서 각 서비스에 맞는 툴 선택 + 아키텍쳐를 깊게 고민 후 변경 예정                                                                                                                                     |

<br/>

<br/>
<br/>

## 📌 Git/GitHub Convention

### 📍 Git Flow

1. **`main(=master)`** : 오직 배포를 위한 브랜치 → 특별한 상황이 아니라면 배포만 진행
2. **`develop`** : 작업한 내용을 취합하는 곳 (default branch)
3. **`feat(=feature)`** : 각 작업물을 분기해 새로 만들어 사용할 브랜치

<img width="600" alt="git flow" src="https://github.com/user-attachments/assets/d4742974-031a-4073-b7e6-dcaa6286fbd5" />

<br />

### 📍 Commit Naming Convention

**Commit 메시지 종류 설명**

| 제목               | 내용                                                            |
| ------------------ | --------------------------------------------------------------- |
| `setting`          | 초기 세팅 + 패키지 설치 등 개발 설정 관련                       |
| `feat`             | 새로운 기능 추가 / 퍼블리싱                                     |
| `fix`              | 버그 수정                                                       |
| `api`              | API 연결 로직 작성                                              |
| `refactor`         | 프로덕션 코드 리팩토링 및 QA 반영                               |
| `chore`            | 빌드 테스트 업데이트, 패키지 매니저 설정 (프로덕션 코드 변경 X) |
| `deploy`           | 배포 작업                                                       |
| `comment`          | 필요한 주석 추가 및 변경                                        |
| `test`             | 테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 X)             |
| `rename`           | 파일 또는 폴더 이름 수정 및 이동 작업                           |
| `remove`           | 파일 삭제 작업만 수행                                           |
| `docs`             | 문서 수정                                                       |
| `!HOTFIX`          | 급하게 치명적인 버그 수정                                       |
| `!BREAKING CHANGE` | 커다란 API 변경                                                 |

<br />
<br/>

<details>
<summary>branch naming convention</summary>
<br/>
  
> 여러 단어가 연결된다면 - 로 연결한다.

```ts
커밋 컨벤션/#이슈번호/페이지 or 기능 이름
```

</details>

<details> 
<summary>commit message naming convention</summary>

```
커밋컨벤션: 커밋 메시지
```

</details>

<br/>
<br/>

## 📌 Coding Convention

> Default naming
>
> 1. 컴포넌트 / class `PascalCase`
> 2. 폴더명 `camelCase`
> 3. 파일 명 _(컴포넌트 제외)_ `camelCase`
> 4. 변수, 함수 `camelCase`
> 5. 파라미터 `camelCase`
> 6. 상수 `BIG_SNAKE_CASE`

<details> 
<summary> 📛 변수 (Variable)</summary>
  
#### 네이밍 패턴
> - 변수명 : 의미를 확실히 나타낼 수 있도록 만든다. (ex. fruits, userlists)
> - 줄임말은 사용하지 않는다. 이름이 길어지더라도 어떤 변수인지 정확하게 활용. (Btn X → Button으로 사용)

| 종류                    | 케이스 (case) | 예시         |
| ----------------------- | ------------- | ------------ |
| 기본 변수 + 상태(state) | camelCase     | `likeNumber` |
| 상수                    | SNAKE_CASE    | `API_KEY`    |

#### 기본 규칙

- var 키워드는 사용을 하지 않는다.
  - `const` → `let` 순서로 위부터 선언.
- 변수를 조합하여 문자열 생성시 `템플릿 리터럴`을 사용한다. (백틱 `)
- map 사용시 변동되는 리스트라면 key값을 고유하게 잘 설정해주기 **`index 사용 금지`**
  - 서버에서 내려주는 id값 or uuid 사용
- **전역 변수**는 되도록 사용하지 않기

</details>

<details> 
<summary> 👟 함수 (Function)</summary>

#### 네이밍 패턴

| 접두사    | 용도                              | 예시                          |
| --------- | --------------------------------- | ----------------------------- |
| handle    | 이벤트 핸들러                     | `handleSubmitClick`           |
| is, has   | boolean 관련 함수 (default: `is`) | `isChecked` `hasFormValue`    |
| 특정 동사 | 이외 특정 동작 함수               | `filterList` `checkFormValue` |

#### 기본 규칙

- 기본적으로 화살표 함수를 사용한다. (`function` 키워드 사용 X)
- 중복함수는 `utils` 폴더에 모아서 재사용한다.
- 변수/함수 명은 기본적으로 20자
  - 최대한 네이밍에 의미를 담아서 작성하고 필요 시에 주석으로 설명 추가
- 필요하다면 `early return` 패턴을 적극적으로 활용
  ```jsx
  **// early return 패턴**
  function processUser(user) {
    if (!user || !user.isActive) return; // **조건이 맞지 않으면 일찍 반환**
    // 나머지 처리 코드...
  }
  ```

</details>

<details> 
<summary> 🏷️ 타입 (Type)</summary>

> 컴포넌트 인자에 대한 타입은 컴포넌트 상단,
> 그 외의 타입들은 types 폴더로 분리

| 타입           | 사용 시기                  |
| -------------- | -------------------------- |
| **interface**  | Object 필수, 대부분 사용   |
| **type alias** | 단일 변수 (primitive type) |

</details>

<details> 
<summary> 🧩 컴포넌트 (Component)</summary>

#### 기본 규칙

- component snippet은 `rafce`를 사용한다.
- 의미없는 div 또는 컴포넌트 최상단은 fragment를 사용한다.

```jsx
const InfoText = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <p>This our new page, we're glad you're are here!</p>
    </>
  );
};
```

- children이 불필요할 땐 selfClosing를 사용한다. `<Component/>`
- children을 적극적으로 활용한다.

</details>

<details> 
<summary> 🪄 메소드 (Method)</summary>

#### 기본 규칙

- 배열 복사 시에는 스프레드 연산자(…)를 사용한다.
  - `const copys = [ …originals ]`
- for 보단, `forEach`/`map`와 같은 고차함수를 적극 사용한다.
- 구조 분해 할당을 적극 활용한다.

```tsx
interface userDataProps {
  userName: string;
  userBirth: string;
}

function checkIsUser({ userName, userBirth }: userDataProps) {}
```

- 불필요한 반복문은 지양한다. (filter, array.include() 등)
  > 조건부로 데이터를 확인하거나 뽑아야하는 로직을 사용할 때에는 `Map` 이나 `Object`처럼 `key`값을 이용해서 원소를 찾는 자료형을 이용하는것을 고려해보거나, 배열을 순회하지 않고 index로 바로 접근할 수 있는 방법이 없는지 고려한다.

</details>

<details> 
<summary> 🎸 기타 (ETC)</summary>
	
- button 태그에 `type`은 명시적으로 작성한다.
- 비교 연산자는 `===`와 `!==`만을 사용한다.
- axios 안에서 `then/catch` 대신 `async/await`를 지향한다.

</details>

<br/>
<br/>

## 📌 폴더 구조

1. **`shared/`** 아래 폴더는 전부 common(공통)의 의미로 생각한다.
2. **`pages/`** 아래 세부 폴더(components, constants 등등)가 각각 위치한다.

```
📦 Pinback Service
├─ apps
│  ├─ client
│  │  └─ src
│  │     ├─ shared  // 공통으로 재사용하는 코드 위치
│  │     │  ├─ components
│  │     │  ├─ hooks
│  │     │  ├─ utils
│  │     │  ├─ types
│  │     │  └─ ETC
│  │     └─ pages
│  │        ├─ dashBoard
│  │        │  ├─ components
│  │        │  ├─ hooks
│  │        │  ├─ utils
│  │        │  ├─ types
│  │        │  └─ ETC
│  │        └─ detail
│  ├─ extension
│  └─ landing
├─ config  // 모노 레포 공통 config
│  ├─ eslint
│  └─ typescript
└─ packages  // 모노 레포 공통 packages (ex. ds)
   └─ design-system
```

<br/>
<br/>

## 📌 Ground Rule

> 1. 둥글둥글 둥글게 말하기
> 2. 서로에게 무언가를 제안할 때 확실한 근거를 가지고 말하기
> 3. 질문을 부끄러워 하지말고 고민해보고 모르겠으면 적극적으로 질문하기
> 4. 공식 일정 늦지 않기! 참여가 불가능하면 미리 말하기!
> 5. 소통 ! 대화 ! 공유 !
