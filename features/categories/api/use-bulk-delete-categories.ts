import { toast } from "sonner";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"]

export const useBalkDeleteCategories = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Kategori terhapus!")
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            // TODO: Also Validete summary
        },
        onError: () => {
            toast.error("Gagal menghapus kategori.")
        },
    })

    return mutation
}