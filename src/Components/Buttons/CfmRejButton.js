// -- DEPRECATED -- //


import { CheckCircleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/20/solid";

export function CfmRejButton({field, type, clickFunc, setEditedFields}) {
    //need to customise the id to be unique
    const removeField = () => {
        setEditedFields((prevState) => {
            return new Set([prevState.delete(field)]) //union doesn't work in chrome... how annoying
        })

    }
    return (
        <div>
            <label for={`cfmRejButton-${clickFunc.name}`} >
                {type === 'confirm' ?
                    <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" /> :
                    <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />}
            </label>
            <button
                id={`cfmRejButton-${clickFunc.name}`}
                style={{ display: "none" }}
                onClick={() => {
                    clickFunc();
                    removeField();
                }}
            />
        </div>
    )
}