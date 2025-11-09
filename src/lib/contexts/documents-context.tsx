"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Document {
    id: string
    jenis_dokumen: string
    nomorTanggalDitetapkan: string
    tentang: string
    tanggal: string
    nomor: string
    status: "Draft" | "Disetujui" | "Ditolak" | "Diarsipkan"
    verificationDate?: string
}

interface DocumentsContextType {
    documents: Document[]
    setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
    verifyDocument: (docId: string, verificationDate: string) => void
    declineDocument: (docId: string) => void
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined)

export function DocumentsProvider({ children }: { children: ReactNode }) {
    const [documents, setDocuments] = useState<Document[]>([])

    const verifyDocument = (docId: string, verificationDate: string) => {
        setDocuments((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === docId
                    ? {
                        ...doc,
                        status: "Disetujui",
                        verificationDate,
                        tanggal: verificationDate,
                    }
                    : doc
            )
        )
    }

    const declineDocument = (docId: string) => {
        setDocuments((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === docId
                    ? {
                        ...doc,
                        status: "Ditolak",
                    }
                    : doc
            )
        )
    }

    return (
        <DocumentsContext.Provider value={{ documents, setDocuments, verifyDocument, declineDocument }}>
            {children}
        </DocumentsContext.Provider>
    )
}

export function useDocuments() {
    const context = useContext(DocumentsContext)
    if (context === undefined) {
        throw new Error("useDocuments must be used within DocumentsProvider")
    }
    return context
}
