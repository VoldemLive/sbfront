import React, { useEffect, useState, useCallback } from "react"
import Api from "../API/api"
import { useNavigate } from "react-router-dom"
import debounce from "lodash.debounce"
import ModalAlert from "../components/modalAlert"
import DreamDeletedListItem from "../components/dreamDeletedListItem"
import DreamListDeletedControl from "../components/dreamListDeletedControl"
import { useToast } from "../contexts/ToastContext"
import EmptyListItem from "../components/emptyListItem"
import EmptyDeletedListItem from "../components/emptyDeletedListItem"
import Loader from "../components/loader"

const DreamsList = () => {
  const { addToast } = useToast()
  const [dreams, setDreams] = useState([])
  const [filteredDreams, setFilteredDreams] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dreamToDelete, setDreamToDelete] = useState(null)
  const [openFunctionModal, setOpenFunctionModal] = useState(false)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDreams = async () => {
      setIsLoading(true)
      const { data } = await Api.getDreams(true)
      if (data) {
        setDreams(data.dreams)
        setFilteredDreams(data.dreams)
      }
      setIsLoading(false)
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
        addToast("Dream deleted", "success")
      } else {
        addToast("Error deleting dream", "danger")
      }
      setOpenFunctionModal(false)
      setDreamToDelete(null)
    }
  }

  const handleRestoreClick = async (dream) => {
    console.log("handleRestoreClick", dream)
    const { status } = await Api.restoreDream(dream.id)
    if (status === 200) {
      const updatedDreams = dreams.filter((d) => d.id !== dream.id)
      setDreams(updatedDreams)
      setFilteredDreams(updatedDreams)
      addToast("Dream restored", "success")
    } else {
      addToast("Error restoring dream", "danger")
    }
  }

  const handleShowDreams = () => {
    navigate("/dreams")
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <DreamListDeletedControl
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          navigate={navigate}
          onShowDreams={handleShowDreams}
        />
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <Loader />
          ) : filteredDreams.length === 0 ? (
            <EmptyDeletedListItem />
          ) : (
            filteredDreams.map((dream) => (
              <DreamDeletedListItem
                key={dream.id}
                dream={dream}
                onRestoreClick={handleRestoreClick}
                onDeleteClick={(id) => {
                  setDreamToDelete(id)
                  setOpenFunctionModal(true)
                }}
              />
            ))
          )}
        </div>

        <ModalAlert
          isOpen={openFunctionModal}
          onClose={() => setOpenFunctionModal(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to completly delete this dream? This action cannot be undone."
          title="Completely Delete Dream"
          color="failure"
        />
      </div>
    </>
  )
}

export default DreamsList
