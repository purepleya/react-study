import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  // data 에는 queryFn 으로 처리한 결과 값
  // isPending 요청상태
  // isError 에러 응답을 받았는지 여부
  // 에러가 발생했을때의 에러 객체
  // 기타 등등의 값들이 있음
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'], // 키의 수나 데이터 타입이 정해져 있지 않다, 임의로 정하면 된다.
    queryFn: fetchEvents,
    staleTime: 5000, // 캐시 유지 시간(ms), 해당 시간 이전까지는 요청을 보내지 않는다. 기본은 0
    // gcTime: 1000 // 데이터와 캐시를 얼마나 유지할지(ms), 기본 5분, 이시간이 지나면 캐시를 지워버림
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
