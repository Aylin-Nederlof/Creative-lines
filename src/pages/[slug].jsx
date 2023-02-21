import Message from "components/message"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth, db } from "../../utils/firebase"
import {toast } from 'react-toastify'
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore"



const PostDetails = () =>{
    const route = useRouter();
    const routeData = route.query;
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages]= useState([]);


    const submitMessage = async () =>{
        if(!auth.currentUser) return route.push('/auth/login');
        if(!message){
            toast.error(`Don't leave an empty message`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500
            });
            return;
        }
        const docRef = doc(db, 'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time : Timestamp.now(),
                id: Timestamp.now().toString()
            }),
        });
        setMessage('');
    }

    const getComments = async () => {
        const docRef = doc(db, 'posts',routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) =>{
            setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
    }

    useEffect(()=>{
        if (!route.isReady) return;
        getComments();
    }, [route.isReady])

    return(
        <div>
            <Message {...routeData}>

            </Message>
            <div className="my-4">
                <div className="flex">
                    <input className="bg-gray-800 w-full p-2 text-white text-sm py-2 px-4" onChange={(e)=> setMessage(e.target.value)} type="text" value={message} placeholder="send a message 🥰" />
                    <button onClick={submitMessage} className="bg-indigo-500 text-white py-2 px-4 text-sm">Submit</button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessages?.map((message)=>(
                        <div key={message.id } className="bg-white p-4 my-4 border-2">
                            <div className="flex items-center gap-2 mb-4">
                                <img className="w-10 rounted-full" src={message.avatar} alt="" />
                                <h2>{message.userName}</h2>
                            </div>
                            <div>
                                <h2>{message.message}</h2>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}


export default PostDetails