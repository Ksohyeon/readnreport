import styles from "./InfiniteReport.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import Report from "../../../../object/Report";
import { call } from "../../../../service/ApiService";

const fetchUrl = async (page) => {
  const response = await call(`/report/all?page=${page}`, "GET");
  console.log(response);
  return response;
};

function InfiniteReport() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["all-reports"],
    queryFn: ({ pageParam = 1 }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next !== -1 ? lastPage.next : undefined;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.toString()}</div>;
  }

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <InfiniteScroll
        className={styles["scroll"]}
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) => {
          return pageData.reports.map((report) => (
            <Report
              title={report.title}
              bookTitle={report.bookTitle}
              createdAt={report.createdAt}
              views={report.views}
              likeCnt={report.likeCnt}
            />
          ));
        })}
      </InfiniteScroll>
    </>
  );
}

export default InfiniteReport;