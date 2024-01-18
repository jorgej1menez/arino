import React, {useEffect, useState} from "react";
import SpacingCustomize from "@/Admin/Components/PageCustomize/SpacingCustomize";

export default function MovingTextCustomize({currentSection, spacingCallback, updateMovingTextSection, sectionData}){
    const [tab, setTab] = useState('general');
    const [data, setData] = useState({
        text: sectionData.text
    })

    // update state
    useEffect(() => {
        updateMovingTextSection(data)
    }, [data])
    return(
        <>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item" onClick={() => setTab('general')} style={{cursor: "pointer"}}>
                    <span className={`nav-link ${tab === "general" && "active"}`}>General</span>
                </li>
                <li className="nav-item" onClick={() => setTab('spacing')} style={{cursor: "pointer"}}>
                    <span className={`nav-link ${tab === "spacing" && "active"}`}>Spacing</span>
                </li>
            </ul>
            {tab === "general" ? (
                <div className="form-group">
                    <label>Text</label>
                    <input type="text" className="form-control mb-3" value={data.text}
                           onChange={(e) => setData({text: e.target.value})}
                    >
                    </input>
                </div>
            ) : (
                <SpacingCustomize spacingCallback={spacingCallback} currentSection={currentSection} />
            )}
        </>
    )
}
