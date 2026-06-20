export default function MessageBubble({text,type}){

    return(

        <div
            className={`p-4 rounded-xl max-w-[70%] mb-4 ${
                type === "user"
                ? "bg-black text-white ml-auto"
                : "bg-gray-300 text-black"
            }`}
        >

            {text}

        </div>
    )
}