"use client";

import { ApiResponse, DelegateData } from "@/types";
import { formatNumber } from "@/lib/utils/formatNumber";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import AvatarGenerator from "../ui/AvatarGenerator";
import { truncateAddress } from "@/lib/utils/truncateAddress";
import MembershipBadges from "../ui/MembershipBadges";
import Pagination from "./Pagination";
import { Tooltip } from "react-tooltip";
import { MdContentCopy } from "react-icons/md";

export interface InitialDataProps {
  initialData: DelegateData[];
  member: boolean;
  background: string;
  platform: string;
  iconURL: string;
}

const OptimismDataTable: React.FC<InitialDataProps> = ({
  initialData,
  member,
  background,
  platform,
  iconURL,
}) => {
  const [page, setPage] = useState<number>(1); // Start from page 1
  const [sort, setSort] = useState<string>("voting_power");
  const [isAsc, setIsAsc] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const ITEMS_PER_PAGE = 20;

  // Memoized calculations for pagination and data
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return initialData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [initialData, page]);

  const totalPages = useMemo(() => {
    return Math.ceil(initialData.length / ITEMS_PER_PAGE);
  }, [initialData]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const tableRef = useRef<HTMLTableElement | null>(null);

  //   const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //   const fetchMoreData = useCallback(
  //     async (page: number) => {
  //       if (loading || isFirstRender) return;
  //       // Scroll to the top of the table after data is fetched
  //       if (tableRef.current) {
  //         tableRef.current.scrollTo({ behavior: "smooth" });
  //       }
  //       setLoading(true);

  //       try {
  //         console.log(
  //           `${API_URL}/${platform}?page=${page}&sort=${sort}&isAsc=${isAsc}&search=${search}`
  //         );
  //         const res = await fetch(
  //           `${API_URL}/${platform}?page=${page}&sort=${sort}&isAsc=${isAsc}&search=${search}`
  //         );
  //         const json: ApiResponse = await res.json();
  //         console.log(json);
  //         setData(json.data);
  //         setHasMore(json.data.length > 0);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //     [page, loading, sort, isAsc]
  //   );

  //   useEffect(() => {
  //     console.log("useEffect called");
  //     if (!isFirstRender) {
  //       console.log("inside if condition in useEffect");
  //       fetchMoreData(page); // Fetch data when page, sort, isAsc, or search changes
  //     }
  //     // Set isFirstRender to false after the initial render
  //     setIsFirstRender(false);
  //   }, [page, isFirstRender, sort, isAsc]);

  //   const handleNextPage = () => {
  //     setPage((prevPage) => prevPage + 1);
  //   };

  //   const handlePreviousPage = () => {
  //     if (page > 1) {
  //       setPage((prevPage) => prevPage - 1);
  //     }
  //   };

  //   const handlePageChange = (newPage: number) => {
  //     setPage(newPage);
  //   };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handleSortOrderChange = () => {
    setIsAsc((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto bg-white rounded-[20px]">
      <div
        className={`p-[20px] md:p-[30px] h-[100px] rounded-t-[20px] w-full flex justify-between items-center ${background} ${
          platform === "compound" ? "text-black" : "text-white"
        }`}
      >
        <span className="flex flex-row items-center text-inherit font-mori font-semibold text-xl md:text-2xl">
          <Image
            src={iconURL}
            alt="optimism logo"
            width={56}
            height={56}
            className="h-[40px] w-[40px]  md:h-[50px] md:w-[50px] rounded-full mr-2"
          />
          All Delegates
        </span>
        <span className="font-normal text-md md:text-xl font-mori">
          {/* {"(" + formatNumber(initialData.length) + " delegates)"} */}
          (235,285 Delegates)
        </span>
      </div>

      <div
        className="max-h-[650px] overflow-y-auto w-full custom-scrollbar border-b"
        ref={tableRef}
      >
        <div
          className={`${
            platform === "optimism" ? "min-w-[550px]" : "min-w-[450px]"
          } flex flex-row gap-2 bg-[#f0f0f0] text-black font-mori font-semibold text-sm md:text-[16px] leading-normal sticky top-0 z-[100] py-4 px-4`}
        >
          <div className="flex justify-start items-center basis-1/5 min-w-[50px] ">
            #
          </div>
          <div className="flex items-center justify-start basis-1/2 min-w-[100px] ">
            Delegate
          </div>
          {platform === "optimism" ? (
            <div className="flex justify-center items-center basis-1/2 min-w-[100px]">
              Member
            </div>
          ) : null}
          <div className="flex justify-center items-center basis-1/2 min-w-[140px]">
            {platform === "optimism" ? (
              <div className="flex justify-center py-2 max-w-[140px] min-w-[140px] border border-[#a3a3a3] rounded-full">
                <span>Voting Power</span>
                <button
                  type="button"
                  aria-label="asc"
                  className="ml-1"
                  onClick={() => {
                    handleSortChange("voting_power");
                    handleSortOrderChange();
                  }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 320 512"
                    aria-hidden="true"
                    focusable="false"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {sort !== "voting_power" ? (
                      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                    ) : isAsc ? (
                      <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                    ) : (
                      <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                    )}
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex justify-center py-2 max-w-[140px] min-w-[140px]">
                <span>Voting Power</span>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center basis-1/2 min-w-[120px] ">
            <div className="flex justify-center py-2 max-w-[120px] min-w-[120px] border border-[#a3a3a3] rounded-full">
              <span>Influence</span>
              <button
                type="button"
                aria-label="asc"
                className="ml-1"
                onClick={() => {
                  handleSortChange("mHHi");
                  handleSortOrderChange();
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 320 512"
                  aria-hidden="true"
                  focusable="false"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {sort !== "mHHi" ? (
                    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                  ) : isAsc ? (
                    <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                  ) : (
                    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            platform === "optimism" ? "min-w-[550px]" : "min-w-[450px]"
          } divide-y md:text-sm text-xs text-black font-mori font-normal`}
        >
          {paginatedData.map((item, index) => (
            <div
              key={index}
              className="flex flex-row gap-2 py-3 px-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="basis-1/5 flex items-center min-w-[50px]">
                {(page - 1) * ITEMS_PER_PAGE + index + 1}
              </div>
              <div
                className="basis-1/2 flex items-center gap-1 min-w-[100px]"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  item.ens_name === null ? item.delegate : item.ens_name
                }
                data-tooltip-place="bottom"
              >
                <AvatarGenerator address={item.delegate || ""} />
                <span className="truncate font-semibold max-w-xs text-xs lg:text-[15px]">
                  {item.ens_name === null
                    ? truncateAddress(item.delegate || "")
                    : item.ens_name}
                </span>
                <button
                  onClick={() => {
                    if (item.delegate) {
                      navigator.clipboard.writeText(item.delegate);
                      setCopiedIndex(index);

                      // Remove the "Copied!" text after 2 seconds
                      setTimeout(() => {
                        setCopiedIndex(null);
                      }, 800);
                    }
                  }}
                  className="ml-2 text-black hover:opacity-100 opacity-50 relative"
                  title="Copy Delegate Address"
                >
                  <MdContentCopy />
                  {copiedIndex === index && (
                    <span className="absolute top-[-5px] left-[400%] transform -translate-x-1/2 bg-transparent text-blue-700 text-xs px-2 py-1 rounded border border-blue-700">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
              <Tooltip id="my-tooltip" />
              {platform === "optimism" ? (
                <div className="basis-1/2 flex flex-row justify-center items-center min-w-[100px]">
                  <div className="flex flex-row gap-0 items-center justify-center">
                    <MembershipBadges item={item} />
                  </div>
                </div>
              ) : null}
              <div className="basis-1/2 flex flex-row justify-center items-center flex-wrap min-w-[140px]">
                <span className="flex flex-col items-center justify-center text-xs lg:text-sm">
                  {formatNumber(parseInt(item.voting_power))}
                  <span className="font-semibold ">
                    {"(" + Number(item.th_vp).toFixed(2) + "%)"}
                  </span>
                </span>
              </div>
              <div className="basis-1/2 flex items-center justify-center font-bold min-w-[120px]">
                {Number(item.influence).toFixed(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="font-mori font-normal text-xs text-gray-500 self-end p-4">
        Last updated on:-{" "}
        <span className="text-black ml-1">30 November, 2024</span>
      </div>
    </div>
  );
};

export default OptimismDataTable;
