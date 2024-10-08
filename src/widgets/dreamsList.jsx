import React, { useEffect, useState, useCallback, useMemo } from "react"
import Api from "../API/api"
import { useNavigate } from "react-router-dom"
import debounce from "lodash.debounce"
import ModalAlert from "../components/modalAlert"
import DreamListItem from "../components/dreamListItem"
import DreamListControl from "../components/dreamListControl"
import EmptyListItem from "../components/emptyListItem"

const DreamsList = () => {
  const [dreams, setDreams] = useState([])
  const [filteredDreams, setFilteredDreams] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dreamToDelete, setDreamToDelete] = useState(null)
  const [openFunctionModal, setOpenFunctionModal] = useState(false)
  const navigate = useNavigate()

  const fetchDreams = useCallback(async () => {
    const { data } = await Api.getDreams(false)
    if (data) {
      setDreams(data.dreams)
      setFilteredDreams(data.dreams)
    }
  }, [])

  useEffect(() => {
    fetchDreams()
  }, [fetchDreams])

  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue, dreamsToSearch) => {
        if (searchValue.length < 3) {
          setFilteredDreams(dreamsToSearch)
          return
        }
        const filtered = dreamsToSearch.filter((dream) =>
          dream.description.toLowerCase().includes(searchValue.toLowerCase())
        )
        setFilteredDreams(filtered)
      }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(searchTerm, dreams)
  }, [searchTerm, dreams, debouncedSearch])

  const handleDelete = useCallback(async () => {
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
  }, [dreamToDelete, dreams])

  const handleEditClick = useCallback(
    (dream) => {
      navigate(`/edit-dream/${dream.id}`)
    },
    [navigate]
  )

  const handleShowDeleted = useCallback(() => {
    navigate("/deleted-dreams")
  }, [navigate])

  return (
    <div className="flex w-full flex-col">
      <DreamListControl
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        navigate={navigate}
        onShowDeleted={handleShowDeleted}
      />
      <div className="grid grid-cols-1 gap-4">
        {filteredDreams.length === 0 ? (
          <EmptyListItem />
        ) : (
          filteredDreams.map((dream) => (
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
          ))
        )}
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
  )
}

export default React.memo(DreamsList)
