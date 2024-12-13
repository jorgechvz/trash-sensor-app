import {
  getCollectionSchedule,
  getCollectionsStats,
  postCollectionSchedule,
} from "@/api/collections.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCollectionStats = (containerId?: string) => {
  const queryClient = useQueryClient();
  const collectionStatsQuery = useQuery({
    queryKey: ["collectionStats"],
    queryFn: getCollectionsStats,
  });

  const collectionScheduleQuery = useQuery({
    queryKey: ["collectionSchedule", containerId],
    queryFn: () => getCollectionSchedule(containerId ?? ""),
  });


  const collectionScheduleMutation = useMutation({
    mutationFn: postCollectionSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collectionSchedule", containerId],
      });
    },
  });

  return {
    collectionStatsQuery,
    collectionScheduleMutation,
    collectionScheduleQuery
  };
};

