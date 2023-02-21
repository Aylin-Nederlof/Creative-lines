

import { auth, db } from "../../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import {toast} from "react-toastify"


export default function Post(){
    const [post, setPost] = useState({description: ""});
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    const submitPost = async (e) => {
        e.preventDefault();

        // run checks for description
            if(!post.description){
                toast.error('Description Field empty 😅',{
                    possition: toast.POSITION.TOP_CENTER,
                    autoclose: 1500
                });
                return;
            }
            if(post.description.length > 300){
                toast.error('Description too long 😅',{
                    possition: toast.POSITION.TOP_CENTER,
                    autoclose: 1500
                });
                return;
            }
        if(post?.hasOwnProperty("id")){
            const docRef = doc(db, 'posts', post.id);
            const updatedPost = {...post, timestamp: serverTimestamp()}
            await updateDoc(docRef, updatedPost);
            toast.success('post has been updated 🤘', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            })
            return route.push('/')
        }else{

        

            const collectionRef = collection(db, "posts");
            await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
            });
            setPost({description: ''});
            toast.success('post has been made 🤘', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            })
            return route.push('/');
        }
    };

    const checkUser = async() => {
        if(loading) return;
        if(!user) route.push("/auth/login");
        if (routeData.id){
            setPost({description:routeData.description, id:routeData.id})
        }
    }
    useEffect(()=>{
        checkUser();
    }, [user, loading]);

    return(
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">
                    {post.hasOwnProperty("id") ? 'Edit your post' : 'Create a new post'}
                </h1>
                <div className="py-2">
                    <label className="text-lg font-medium py-2" htmlFor="post_description">Description</label>
                    <textarea value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} className="bg-gray-800 h-48 w-full text-white rounded-lg text-small p-2" id="post_description"></textarea>
                    <p className={`font-medium text-sm ${post.description.length > 300 ? 'text-red-600' : 'text-indigo-600'}`}>{post.description.length}/300</p>
                </div>
                <button type="submit" className="w-full bg-indigo-500 text-white font-medium p-2 my-2 rounded-lg text-small">Submit</button>
            </form>
        </div>
    )
}