// -- DEPRECATED -- //

import { PencilSquareIcon } from "@heroicons/react/20/solid";

export function EditButton({field, editedFields, setEditedFields, isOwnPage}) {
    const handleClick = () => {
        setEditedFields((prevState) => {
            return new Set([field, ...prevState]) //union doesn't work in chrome... how annoying
        })
    }
    if (editedFields.has(field) || !isOwnPage) { // or if current user matches the user for this page, display nothing
        return;
    } else { // if field is not in editedFields, display this
        return (
            <div>
                <label for={`editButton-${field}`} >
                    <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                </label>
                <button onClick={() => handleClick()} id={`editButton-${field}`} style={{ display: "none" }} />
            </div>
        )
    }
}