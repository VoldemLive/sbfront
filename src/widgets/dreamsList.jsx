import React, { useEffect, useState, useCallback } from "react"
import Api from "../API/api"
import { useNavigate } from "react-router-dom"
import debounce from "lodash.debounce"
import ModalAlert from "../components/modalAlert"
import DreamListItem from "../components/dreamListItem"
import DreamListControl from "../components/dreamListControl"

const DreamsList = () => {
  const [dreams, setDreams] = useState([])
  const [filteredDreams, setFilteredDreams] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dreamToDelete, setDreamToDelete] = useState(null)
  const [openFunctionModal, setOpenFunctionModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDreams = async () => {
      const { data } = await Api.getDreams(false)
      if (data) {
        setDreams(data.dreams)
        setFilteredDreams(data.dreams)
      }
    }

    fetchDreams()
  }, [])

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      if (searchValue.length < 3) {
        setFilteredDreams(dreams)
        return
      }
      const filtered = dreams.filter((dream) =>
        dream.description.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredDreams(filtered)
    }, 300),
    [dreams]
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const handleDelete = async () => {
    if (dreamToDelete) {
      const { data } = await Api.deleteDream(dreamToDelete)
      if (data) {
        const updatedDreams = dreams.filter(
          (dream) => dream.id !== dreamToDelete
        )
        setDreams(updatedDreams)
        setFilteredDreams(updatedDreams)
      }
      setOpenFunctionModal(false)
      setDreamToDelete(null)
    }
  }

  const handleEditClick = (dream) => {
    navigate(`/edit-dream/${dream.id}`)
  }

  const handleShowDeleted = () => {
    console.log("Show deleted dreams")
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <DreamListControl
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          navigate={navigate}
          onShowDeleted={handleShowDeleted}
        />
        <div className="grid grid-cols-1 gap-4">
          {filteredDreams?.map((dream) => (
            <DreamListItem
              key={dream.id}
              dream={dream}
              onDreamClick={() => navigate(`/dreams/${dream.id}`)}
              onEditClick={handleEditClick}
              onDeleteClick={(id) => {
                setDreamToDelete(id)
                setOpenFunctionModal(true)
              }}
            />
          ))}
        </div>

        <ModalAlert
          isOpen={openFunctionModal}
          onClose={() => setOpenFunctionModal(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this dream?"
          title="Delete Dream"
          color="failure"
        />
      </div>
    </>
  )
}

export default DreamsList
