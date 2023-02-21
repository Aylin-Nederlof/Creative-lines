


const Message = ({children, avatar, username, description}) => {

    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img className="w-10 rounded-full" src={avatar} alt="" />
                <h2>{username}</h2>
            </div>
            <div className="py-4">
                <p className="text-sm font-normal">{description}</p>
            </div>
            {children}
        </div>
        

    )

}


export default Message;