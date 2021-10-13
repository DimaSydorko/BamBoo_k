import React, {useState, useEffect, ChangeEvent} from 'react'

export type ProfileStatusWithHooksPropsType = {
  status: string | null
  updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<ProfileStatusWithHooksPropsType> = (props) => {
  
  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  const activateEditMode = () => {
    setEditMode(true)
  }
  
  useEffect( () => {
    setStatus(props.status)
  }, [props.status] )

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status as string)
  }
  
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  return(
    <div>
      {!editMode &&
        <div>
          <span onDoubleClick={activateEditMode}> {props.status || 'I`m a lazy Panda'}</span>
        </div>
      }
      {editMode && 
        <div>
          <input onChange={onStatusChange} 
            autoFocus={true} 
            onBlur={deactivateEditMode}
            value={status as string}/>
        </div>
      }
    </div>
  )
}

export default ProfileStatusWithHooks