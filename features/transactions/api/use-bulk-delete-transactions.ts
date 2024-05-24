import { toast } from "sonner";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"]

export const useBalkDeleteTransactions = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.transactions["bulk-delete"]["$post"]({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Transaksi terhapus!")
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            queryClient.invalidateQueries({ queryKey: ["summary"] })
        },
        onError: () => {
            toast.error("Gagal menghapus transaksi.")
        },
    })

    return mutation
}