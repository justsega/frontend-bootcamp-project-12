import AddModal from "./AddModal"
import RemoveModal from "./RemoveModal";
import RenameModal from "./RenameModal";

const mappingModals = {
    add: AddModal,
    remove: RemoveModal,
    rename: RenameModal,
}

export default (type) => mappingModals[type];


