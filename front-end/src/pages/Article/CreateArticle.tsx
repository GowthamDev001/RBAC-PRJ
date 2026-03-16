// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { toast } from "sonner"

// import { createArticle } from "@/store/articleSlice"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"

// export default function CreateArticlePage() {

//   const dispatch: any = useDispatch()
//   const navigate = useNavigate()

//   const [title, setTitle] = useState("")
//   const [content, setContent] = useState("")
//   const [loading, setLoading] = useState(false)

//   const validateForm = () => {

//     if (!title.trim()) {
//       toast.error("Title is required")
//       return false
//     }

//     if (!content.trim()) {
//       toast.error("Content is required")
//       return false
//     }

//     if (content.length < 10) {
//       toast.error("Content must be at least 10 characters")
//       return false
//     }

//     return true
//   }

//   const handleSubmit = async (e: React.FormEvent) => {

//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)

//     const result = await dispatch(
//       createArticle({ title, content })
//     )

//     setLoading(false)

//     if (createArticle.fulfilled.match(result)) {

//       toast.success(result.payload.message || "Article created successfully")

//       navigate("/articles")

//     } else {

//       toast.error(result.payload || "Failed to create article")

//     }
//   }

//   return (

//     <div className="flex items-center justify-center min-h-screen bg-gray-100">

//       <Card className="w-[500px] shadow-lg">

//         <CardHeader>
//           <CardTitle className="text-center text-2xl">
//             Create Article
//           </CardTitle>
//         </CardHeader>

//         <CardContent>

//           <form onSubmit={handleSubmit} className="space-y-4">

//             <div className="space-y-2">
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 placeholder="Enter article title"
//                 value={title}
//                 onChange={(e)=>setTitle(e.target.value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="content">Content</Label>

//               <textarea
//                 id="content"
//                 placeholder="Write your article..."
//                 className="w-full border rounded-md p-2 min-h-[150px]"
//                 value={content}
//                 onChange={(e)=>setContent(e.target.value)}
//               />

//             </div>

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={loading}
//             >
//               {loading ? "Creating..." : "Create Article"}
//             </Button>

//           </form>

//         </CardContent>

//       </Card>

//     </div>
//   )
// }