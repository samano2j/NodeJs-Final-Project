import LibrarySideContent from "./LibrarySideContent"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const LibrarySide = () => {
    return (
        <div className="block-box flex-1 h-5/6 p-5 flex flex-col gap-7">
            <div className="text-4xl flex gap-5 items-center">
                <FontAwesomeIcon icon={faBookmark} />
                <h1>Your Library</h1>
            </div>
            <LibrarySideContent />
        </div>
    )
}
export default LibrarySide