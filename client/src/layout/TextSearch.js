import React from "react";

function TextSearch() {

    const search = async (keyword, start, end) => {
        let request = await fetch(`http://app.ishs.co.kr/post/search?keyword=${keyword}&start=${start}&end=${end}`)
        let data = await request.json()
        return data.content
    }

    return(
        <div>
            {/* {search()} */}
        </div>
    )
}

export default TextSearch;