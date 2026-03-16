import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  createReview,
  getReviewsByArticle,
  deleteReview,
  updateReview
} from "@/store/reviewSlice"

import {
  Star,
  Trash2,
  Pencil
} from "lucide-react"

export default function ReviewsPage({ articleId }: any) {

  const dispatch: any = useDispatch()

  const { reviews } = useSelector((state: any) => state.reviews)

  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)

  const [editReview, setEditReview] = useState<any>(null)
  const [editOpen, setEditOpen] = useState(false)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {

    dispatch(getReviewsByArticle(articleId))

  }, [articleId])

  const handleCreate = () => {

    dispatch(createReview({
      article_id: articleId,
      rating,
      review
    }))

    setReview("")
    setRating(5)

  }

  const handleUpdate = () => {

    dispatch(updateReview({
      id: editReview.id,
      rating,
      review
    }))

    setEditOpen(false)

  }

  const handleDelete = (id: string) => {

    dispatch(deleteReview(id))
    setDeleteId(null)

  }

  return (

    <div className="space-y-4">

      <Card>
        <CardContent className="space-y-3">

          <Input
            placeholder="Write review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <Input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />

          <Button onClick={handleCreate}>
            Add Review
          </Button>

        </CardContent>
      </Card>

      {reviews.map((r: any) => (

        <Card key={r.id}>

          <CardContent className="flex justify-between items-center">

            <div>

              <div className="flex items-center gap-1 text-yellow-400">

                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}

              </div>

              <p className="text-sm mt-1">
                {r.review}
              </p>

            </div>

            <div className="flex gap-2">

              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditReview(r)
                  setRating(r.rating)
                  setReview(r.review)
                  setEditOpen(true)
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => setDeleteId(r.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>

            </div>

          </CardContent>

        </Card>

      ))}

      <Dialog open={editOpen} onOpenChange={setEditOpen}>

        <DialogContent>

          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>

          <Input
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <Input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />

          <DialogFooter>

            <Button onClick={handleUpdate}>
              Save
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

    </div>

  )
}