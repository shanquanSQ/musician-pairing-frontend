// -- DEPRECATED -- //

import { TrashIcon } from "@heroicons/react/20/solid";

export function DeleteButton({field, editedFields}) {
    const handleClick = () => {
        //some code to remove the association
    }
     // if field is not in editedFields, display this
        return (
            <div>
                <label for={`editButton-${field}`} >
                    <TrashIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
                </label>
                <button onClick={() => handleClick()} id={`editButton-${field}`} style={{ display: "none" }} />
            </div>
        )
    
}