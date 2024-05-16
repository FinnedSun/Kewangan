import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle
} from "@/components/ui/dialog";
import { handle } from "hono/vercel";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const confrim = () => new Promise((resolve, reject) => {
    setPromise({ resolve })
  })

  const hendleClose = () => {
    setPromise(null)
  }

  const hendleConfirm = () => {
    promise?.resolve(true)
    hendleClose()
  }

  const hendleCancle = () => {
    promise?.resolve(false)
    hendleClose()
  }

  const ConfrimationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button
            onClick={hendleCancle}
            variant={"outline"}
          >
            Batal
          </Button>
          <Button
            onClick={hendleConfirm}
            variant={"outline"}
          >
            Confrim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfrimationDialog, confrim]
}