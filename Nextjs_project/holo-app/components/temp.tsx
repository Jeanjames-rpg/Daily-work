"use client";

export default function CreateNote() {
    async function handleCreateNote(){
        const response =  await fetch ('/api/notepost', {
            method:"POST",
            body: JSON.stringify({
                title: "my notes ",
                content: "hello welcome"
            }),

            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        console.log(data)
    }

    return (
        <button onClick={handleCreateNote}>
            add note
        </button>
    )
}