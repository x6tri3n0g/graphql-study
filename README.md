# movieql

Movie API with Graphql

<br />

> 서버에서 Graphql로 API 제공하기
> [Nomad Coders 강의 - GraphQL로 영화 API 만들기](https://nomadcoders.co/graphql-for-beginners/lobby)

<br />

Using `graphql-yoga`
`Node.js`, `JavaScript`, `Back-end`를 베이스로 영화 API를 제공하는 서버를 만들어 봅시다.

<br />

## 사용방법

[graphql-yoga](https://github.com/prisma-labs/graphql-yoga)

<br />

```
$ yarn add graphql-yoga
```

<br />
<br />

## Graphql 서버 만들기

<br />

### Over-fetching과 Under-fetching

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
