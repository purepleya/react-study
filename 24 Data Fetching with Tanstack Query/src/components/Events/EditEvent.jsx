import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;

      // 수동으로 갱신하려는 데이터의 작업을 모두 취소한다.
      await queryClient.cancelQueries({queryKey: ['events', params.id]});
      // update 작업이 실패할때를 대비한 old data
      const previousEvent = queryClient.getQueryData(['events', params.id]);

      // queryKey 와 데이터를 인자로 넘겨 쿼리 데이터를 서버 요청 없이 갱신한다.
      queryClient.setQueryData(['events', params.id], newEvent);

      // 혹시 mutationFn 이 실패하는 경우 아래 반환 객체가 onError 함수의 contenxt가 된다.
      return {previousEvent}
    },
    onError: (error, data, context) => {
      // 에러가 발생한 경우 onMutate 에서 반환한(contenxt) 를 이용해 이전 값으로 되돌린다.
      queryClient.setQueryData(['events', params.id], context.previousEvent);
    },
    // 성공 여부와 관계 없이 mutation 이 종료 될때 실행된다.
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]);
    }
  });


  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate('../');
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
