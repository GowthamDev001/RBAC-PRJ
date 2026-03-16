import { Request, Response } from "express"
import * as reviewService from "../services/reviewService"

export const createReview = async (req: any, res: Response) => {

    try {

        const { article_id, rating, review } = req.body

        const author_id = req.user.id

        const result = await reviewService.createReviewService(
            article_id,
            author_id,
            rating,
            review
        )

        res.json(result)

    } catch (error: any) {

        res.status(500).json({
            message: error.message
        })

    }

}

export const getReviewsByArticle = async (req: Request, res: Response) => {

    try {

        const reviews = await reviewService.getReviewsByArticleService(
            req.params.articleId as string
        )

        res.json(reviews)

    } catch (error: any) {

        res.status(500).json({
            message: error.message
        })

    }

}

export const updateReview = async (req: Request, res: Response) => {

    try {

        const { rating, review } = req.body

        const result = await reviewService.updateReviewService(
            req.params.id as string,
            rating,
            review
        )

        res.json(result)

    } catch (error: any) {

        res.status(500).json({
            message: error.message
        })

    }

}

export const deleteReview = async (req: Request, res: Response) => {

    try {

        await reviewService.deleteReviewService(req.params.id as string)

        res.json({
            message: "Review deleted successfully"
        })

    } catch (error: any) {

        res.status(500).json({
            message: error.message
        })

    }

}