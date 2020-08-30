# movieql

Movie API with Graphql

<br />

> 서버에서 Graphql로 API 제공하기<br/ >[Nomad Coders 강의 - GraphQL로 영화 API 만들기](https://nomadcoders.co/graphql-for-beginners/lobby)

<br />

Using `graphql-yoga`, `Node.js`, `JavaScript`, `Back-end`를 베이스로 영화 API를 제공하는 서버를 만들어 봅시다.

<br />

## 사용방법

[graphql-yoga](https://github.com/prisma-labs/graphql-yoga)

<br />

```
$ yarn add graphql-yoga
```

<br />
<br />
<br />

## Over-fetching과 Under-fetching

RESTful API를 제공하는 서버에서는 `/users/ GET`형태로 user들의 정보를 불러옵니다. 이러한 형태로 user의 정보를 모두 불러오게 될 경우 예를 들어 `사용자명`, `성`, `이메일`, `프로필 이미지` 등 많은 데이터들이 묶인 패키지를 보낼 것입니다. 이처럼 한번의 요청에서 필요한 데이터들은 사용하지 않을 데이터까지 모두 요청할 수 있기 때문에 Database에게 무리한 데이터 요청을 보낼 수 있습니다.

<br />

만약 처음에는 user의 GET 요청에서 users를 보내게 되면 `프로필 사진`, `이름`, `성`, `이메일` 영역을 사용하지 않고 `닉네임(사용자명)`만을 요구하고 싶습니다. 하지만 RESTful 방식의 요청은 그렇지 않죠. 이것을 `Over-fetching`이라고 합니다. 즉, 제가 요청한 영역의 정보보다, 많은 정보를 서버에서 제공받는 경우를 말합니다. 이것은 비효율적입니다.

<br />

이제 우리는 `Graphql`를 통해 `Over-fetching` 없이 데이터를 불러오고 원하는 정보만을 가져와서 컨트롤 할 것입니다. 즉, Front-end 측에서 서버로 부터 Database의 닉네임(사용자명)만을 요청 할 것입니다.

<br/>
<br/>

`Under-fetching`은 어떤 하나의 것을 완성하기 위해 또 다른 요청이 추가적으로 발생하는 경우를 말합니다. 예를 들어 인스타그램 페이지를 살펴보면 첫 페이지에 들어가면서 인스타그램의 `피드`, `알림`, `사용자 프로필`을 받아야 합니다. 이 세가지 요청이 모두 오고가야 앱이 실행되는 이 경우를 `Under-fetching`이라고 합니다. 만약 이것을 RESTful API에서 요청한다면 여러번의 요청이 필요합니다.

<br />

```
/feed/ GET
/notification/ GET
/user/1/ GET
```

<br />

이러한 문제를 `Graphql`이 해결할 수 있습니다. 그럼 지금부터 한 query에 우리가 정확하게 원하는 정보만 요청해서 `Over-fetching`과 `Under-fetching`을 해결해보겠습니다.

<br />
<br />

예시를 들어보겠습니다. 필요한 정보들이 있다면 이 모든 것들을 한 URL을 통해서 받는 방식입니다. 물론 Graphql에서 URL은 존재하지 않습니다. URL 체계도 없고 REST와 같은 URL도 없습니다. 오직 하나의 종점(end point)만 있으며 이걸 API로 하든 Graphql로 하든 오직 하나만 있습니다. 이처럼 Graphql에서는 한 개의 query로 만들 수 있습니다.

<br />

Query를 통해 Database에서 무언가를 요청하고 GraphQL 언어로 우리가 원하는 정보를 알려줄 수 있습니다. 예를 들어 인스타그램에서 피드의 댓글과 라이크 수, 알림을 확인했는지에 대한 정보, 유저 프로필에서 사용자명과 프로필 사진을 원한다면 아래와 같은 형태로 요청합니다.

<br />

```
query {
    feed {
        comments
        likeNumber
    }
    notifications {
        isRead
    }
    user {
        username
        profilePic
    }
}
```

<br />

위의 것이 이제부터 다뤄볼 Query의 형태입니다. 이것을 GraphQL의 Back-end에 보내면 이와 같은 요청 정보를 담은 Object를 보내줄 것 입니다. 아래는 JavaScript Object의 형태입니다.

<br />

```
{
    feed: [
        {
            comment: 'hello',
            likeNumber: 20
        },
        ...
    ],
    notifications: [
        {
            isRead: true
        },
        {
            isRead: false
        }
    ],
    user: {
        username: 'hyun',
        profilePic: '...url'
    }
}
```

<br />

위의 GraphQL을 통해 아래의 JavaScript Object를 받아볼 수 있습니다. 즉, 우리가 요청한 것만 정확하게 보내줌으로서 `Over-fetching`과 `Under-fetching`을 방지할 수 있는거죠. 또한 API를 조정하거나 여러가지를 섞어서 원하는 형태의 모든 요청을 만들 수 있습니다.

<br />

여기까지 `GraphQL`을 사용하는 장점과 특징에 대해서 알아보았습니다.

<br />
<br />
<br />

## Creating a GraphQL Server with GraphQL Yoga

<br />

### 환경설정과 서버 실행하기

우리는 먼저 `graphql-yoga`를 설치했고 추가적으로 `nodemon`을 설치합니다.

<br />

```
$ yarn global add nodemon
```

<br />

`nodemon`은 파일을 수정할 때마다 서버를 재시작 해줍니다. 위 명령어를 통해 `nodemon`이 설치되었다면 `package.json`에서 아래 script를 추가해줍니다.

<br />

```
...
    "script" : {
        "start": "nodemon"
    }
}
```

이제 nodemon이 index.js 파일을 주시합니다.

<br />

root에 `index.js` 파일을 만들고 `console.log('Sup');`를 작성합니다.
그리고 `yarn start`해봅니다. 그렇다면 콘솔창에서 바로 Sup이라는 단어를 볼 수 있을 것입니다. 그리고 `console.log('Sup');`를 수정하는 즉시 콘솔창에 나타납니다.(WoW)

<br />

지금부터 서버를 만들어 봅시다.

<br />

```
const graphql = require('graphql-yoga');
```

<br />

가 아닌 ES6 문법을 사용하기 위해

<br />

```
$ yarn add babel-node --dev
```

을 실행합니다. 그리고 `package.json`에서

<br />

```
...
    "start": "nodemon --exec babel-node index.js"
...
```

<br / >

이를 통해 import 문법을 사용할 수 있게 되었습니다.

```
import { GraphQLServer } from 'graphql-yoga';
```

Project의 root에서 `.babelrc` 파일을 생성합니다. 그리고 `babel` 설정에 필요한 라이브러리를 다운로드합니다.

<br />

```
$ yarn add babel-cli babel-preset-env babel-preset-stage-3 --dev
```

<br />

`.babelrc` 파일을 작성합니다.

```
{
    "presents": ["env", "stage-3"]
}
```

<br />

그리고 `index.js`에 아래 코드를 작성합니다.

<br />

```
import { GraphQLServer } from 'graphql-yoga';

const server = new GraphQLServer({
    /* Magic! */
});

server.start(() => console.log('GraphQL Server Running'));
```

<br />

이렇게 Graphql yoga를 통해 서버를 실행시킬 수 있게 되었습니다.
콘솔에서 `Error: No schema defined ...`라는 메시지를 볼 수 있을 것입니다. 여기서 `schema`는 우리가 사용자에게 보내거나 사용자로부터 받을 data에 대한 설명입니다. `schema`를 작성하는 방법은 다음 Section에서 알아보겠습니다.

<br />
<br />
<br />

## Creating the first Query and Resolver

`schema`는 우리가 받거나 줄 정보에 대한 서술입니다. GraphQL의 사용을 위해서 `schema`를 통해 무엇을 주고 받을 것인지 이해해야합니다.

<br />

`graphql` 폴더를 생성하고 그 안에 `schema.graphql` 파일을 생성합니다. 이 파일 안에서는 Query를 작성합니다. Query는 우리가 받을 정보를 정의할 때 작성합니다. GraphQL은 이런 specification(자세한 설명)과 서버에 이러한 유형들을 정의해 놓고 있습니다. 이제 우리가 GraphQL 서버에 할 것은 어떤 Mutations(변형) 그리고 어떤 Query들을 우리가 가졌는지 알려줘야 합니다. 이것을 위해 첫 번째 Query를 선언해보겠습니다. 여기에는 사용자에게 주는 모든 정보들을 Query에 넣겠습니다.

<br />

```
type Query {
    name: String!   // !는 required(필수값이다)를 의미함
}
```

<br />

이것이 Query에 대한 설명이며 index.js에 적용해 봅시다.

<br />

```
...
    const server = new GraphQLServer({
        typeDefs: "graphql/schema.graphql"
    });
...
```

<br />

아직까지는 서버를 start 하더라도 이전과 차이가 없습니다. 왜냐하면 Resolver를 완성시키지 않았기 때문입니다. 아직은 단지 어떤 사용자가 Query에 이름을 보내면 String type의 데이터를 보낸다는 설명을 작성해준 것입니다. 이제부터 우리는 실제로 name Query의 기능부를 작성해야 합니다.

<br />

`/graphql` 폴더 아래에 `resolvers.js` 파일을 생성합니다. 여기서 Resolver는 Query를 resolve(해결)하는 것을 의미합니다. Query란 Database에게 문제 같은 것입니다. 그래서 우리는 Query를 어떤 방식으로 resolve(해결)해야 합니다. 이것을 Resolver가 해결합니다. `resolvers.js`를 작성해 봅시다.

<br />

```
const resolvers = {
    Query: {
        name: () => 'xtring',
    },
};

export default resolvers;
```

<br />

정확히 말하자면 Query를 설명해준 것이며 Resolvers를 프로그래밍했습니다. 보시다시피 GraphQL에서는 View나 URLs 같은 것은 보이지 않습니다. 오직 `Query`와 `Resolvers`만 있을 뿐입니다. 그리고 Resolvers를 우리가 원하는 대로 프로그래밍 할 수 있습니다. 어떤 Database에서 또 다른 Database로 갈 수도 있고 메모리로도 갈 수 있고, 다른 API로도 갈 수 있습니다.(? - 아직 정확히 이해하지 못함) 지금의 경우엔 그냥 이름값('xtring')를 리턴했습니다.

<br />

이제 resolvers를 index.js에 import 해줍니다.

```
import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';

const server = new GraphQLServer({
    typeDefs: 'graphql/schema.graphql',
    resolvers, // resolvers: resolvers, // => ES6 문법의 "파괴할당"
});

server.start(() => console.log('GraphQL Server Running'));
```

<br />

이제 콘솔을 확인하면 `GraphQL Server Running`이라는 문구를 확인할 수 있습니다.
브라우저에서 `localhost:4000`에 접근하게 되면 `GraphQL Playground`가 나옵니다. `GraphQL Playground`는 `GraphQL yoga` 안에 내장되어 있는 것입니다. 여기서 잠깐의 예시로 왼쪽 필드에서

<br />

```
query {
    name
}
```

을 입력하면

<br />

```
{
  "data": {
    "name": "xtring"
  }
}
```

과 같은 결과가 나오는 것을 확인 할 수 있습니다.

<br />
<br />
<br />

## Extending the Schema

우리는 `schema.graphql`에서 데이터의 type(데이터 유형)을 작성해줌으로서 데이터를 요청하는데 약속을 만들어 냅니다. 이것을 통해 요청하는 데이터에 대한 조건을 안전하게 만들 수 있습니다.

<br />

`Playground`는 무엇일까요? `Playground`는 `graphql-yoga`에 따라오는 것인데 우리의 Database를 테스트 해줍니다. 그것이 전부입니다.(일종의 Postman과 같은...) 그렇다면 `Playground`는 `localhost:4000`에서 확인할 수 있습니다. 여기서 `localhost:4000/graphql`를 입력하여 들어가보면 우리 GraphQL의 종점(End-point)에 접근이 가능합니다.

<br />

Query는 data이며 JSON data와 같은 것 입니다. 그렇기 때문에 이것을 어딘가로 보내줘야하는데 그것을 POST라고 합니다. 모든 Query들, Mutation들, 등등 뭐든지... 항상 POST 형태로 보내지게 됩니다. 왜냐하면 서버가 받아야 그에 대한 반응(response)을 줄 수 있기 때문입니다.

<br />

먼저, `graphql/schema.graphql`를 수정해봅시다.

<br/>

```
type Xtring {
    name: String!
    age: Int!
    gender: String!
}

type Query {
    person: Xtring!
}
```

<br />

그리고 `graphql/resolvers.js` 파일을 아래와 같이 수정합니다.

```
const xtring = {
    name: 'hyun',
    age: 27,
    gender: 'male',
};

const resolvers = {
    Query: {
        person: () => xtring,
    },
};

export default resolvers;
```

<br />

서버를 재실행하게 되면 resolver는 `schema.graphql`에 의해 데이터를 가져올 준비를 합니다. `localhost:4000`의 Playground에 접근해 봅니다. Playground 오른쪽에 `Schema`와 `Docs`가 있습니다. 여기서 `Schema`를 클릭하면 우리가 query를 통해 가져올 수 있는 데이터를 확인할 수 있습니다. 즉, Front-end가 참고하는 API와 같습니다.

<br />

지금까지 해본 실습을 통해 어느정도 감이 오시나요? schema.graphql 파일은 받아올 데이터에 대한 정보(schema)를 가지고 있으며 resolvers는 데이터베이스와의 연결을 통해 query를 제공하는 역할을 하는 것 같습니다. 

<br />

