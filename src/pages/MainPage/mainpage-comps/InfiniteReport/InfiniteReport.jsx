import styles from "./InfiniteReport.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import Report from "../../../../object/Report";
import { call } from "../../../../service/ApiService";
import { Link } from "react-router-dom";

const fetchUrl = async (page) => {
  const response = await call(`/report/all?page=${page}`, "GET");
  console.log(response.body);
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
    getNextPageParam: (data) => {
      return data.next != -1 ? data.next : undefined;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.toString()}</div>;
  }

  return (
    <div className={styles["reports"]}>
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {data?.pages.map((page) => {
          return page.reports.map((report) => (
            <div className={styles["report"]}>
              <Link
                key={report.id}
                to={{
                  pathname: "/detail",
                  search: `?id=${report.id}`,
                }}
              >
                <Report
                  key={report.id}
                  title={report.title}
                  bookTitle={report.bookTitle ? report.bookTitle : "."}
                  createdAt={report.createdAt}
                  views={report.views}
                  likeCnt={report.likeCnt}
                />
              </Link>
            </div>
          ));
        })}
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteReport;
