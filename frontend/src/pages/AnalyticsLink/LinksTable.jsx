import { useState } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin6Line, RiPencilFill } from "react-icons/ri";
import { RxCopy } from "react-icons/rx";

import { useApp } from "./../../contexts/AppContext";
import Overlay from "./../AppComponents/Overlay";
import LinkModal from "./../AppComponents/LinkModal";
import DeleteModal from "./../AppComponents/DeleteModal";

import styles from "./Table.module.css";

const URL = import.meta.env.VITE_BASE_URL;
const columns = [
  "Date",
  "Original Link",
  "Short Link",
  "Remarks",
  "Clicks",
  "Status",
  "Action",
];

function LinksTable({ className, links }) {
  const { formatDate, deleteLinkById, updateLinkById } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(`${URL}/${shortUrl}`);
    toast.success("Link Copied!");
  };

  const handleDelete = (id) => {
    setLinkId(id);
    setIsModalOpen(true);
  };

  const handleUpdate = (link) => {
    setSelectedLink(link);
    setIsUpdateModalOpen(true);
  };

  return (
    <article className={className}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td>{formatDate(link.createdAt)}</td>
              <td>{link.originalUrl}</td>
              <td className={styles.shortUrl}>
                {`${URL}/${link.shortCode}`}
                <button className={styles.btn}>
                  <RxCopy
                    size="2rem"
                    onClick={() => copyToClipboard(link.shortCode)}
                  />
                </button>
              </td>
              <td>{link.remarks}</td>
              <td>{link.viewCount}</td>
              <td>
                {!link.expiredAt ||
                new Date(link.expiredAt).getTime() > Date.now() ? (
                  <span className={styles.active}>Active</span>
                ) : (
                  <span className={styles.inactive}>Inactive</span>
                )}
              </td>
              <td className={styles.action}>
                <button
                  className={styles.btn}
                  onClick={() => handleUpdate(link)}
                >
                  <RiPencilFill size="2rem" />
                </button>
                {isUpdateModalOpen && (
                  <Overlay>
                    <LinkModal
                      linkData={selectedLink}
                      onClose={() => setIsUpdateModalOpen(false)}
                      onSubmit={updateLinkById}
                      action="update"
                    />
                  </Overlay>
                )}

                <button
                  className={styles.btn}
                  onClick={() => handleDelete(link.id)}
                >
                  <RiDeleteBin6Line size="2rem" />
                </button>
                {isModalOpen && (
                  <Overlay>
                    <DeleteModal
                      itemId={linkId}
                      itemType="Link"
                      onDelete={(id) => deleteLinkById(id)}
                      onClose={() => setIsModalOpen(false)}
                      set={() => setLinkId(null)}
                    />
                  </Overlay>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default LinksTable;
