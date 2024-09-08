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
