"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Document {
    id: number
    jenis: string
    nomorTanggalDitetapkan: string
    tentang: string
    tanggal: string
    nomor: string
    status: "loading" | "verified" | "pending"
    verificationDate?: string
}

interface DocumentsContextType {
    documents: Document[]
    verifyDocument: (docId: number, verificationDate: string) => void
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined)

const initialDocuments: Document[] = [
    {
        id: 1,
        jenis: "Peraturan",
        nomorTanggalDitetapkan: "01 Mei 2025",
        tentang: "Peraturan Desa",
        tanggal: "Loading",
        nomor: "07",
        status: "loading",
    },
    {
        id: 2,
        jenis: "Peraturan",
        nomorTanggalDitetapkan: "17 Agustus 2024",
        tentang: "Peraturan Pembangunan",
        tanggal: "01 Maret 2025",
        nomor: "02",
        status: "verified",
        verificationDate: "01 Maret 2025",
    },
    {
        id: 3,
        jenis: "Keputusan",
        nomorTanggalDitetapkan: "17 Agustus 2024",
        tentang: "Keputusan Kepala Desa",
        tanggal: "30 Juli 2025",
        nomor: "03",
        status: "verified",
        verificationDate: "30 Juli 2025",
    },
    {
        id: 4,
        jenis: "",
        nomorTanggalDitetapkan: "",
        tentang: "",
        tanggal: "",
        nomor: "",
        status: "pending",
    },
    {
        id: 5,
        jenis: "",
        nomorTanggalDitetapkan: "",
        tentang: "",
        tanggal: "",
        nomor: "",
        status: "pending",
    },
]

export function DocumentsProvider({ children }: { children: ReactNode }) {
    const [documents, setDocuments] = useState<Document[]>(initialDocuments)

    const verifyDocument = (docId: number, verificationDate: string) => {
        setDocuments((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === docId
                    ? {
                        ...doc,
                        status: "verified" as const,
                        verificationDate,
                        tanggal: verificationDate,
                    }
                    : doc,
            ),
        )
    }

    return <DocumentsContext.Provider value={{ documents, verifyDocument }}>{children}</DocumentsContext.Provider>
}

export function useDocuments() {
    const context = useContext(DocumentsContext)
    if (context === undefined) {
        throw new Error("useDocuments must be used within DocumentsProvider")
    }
    return context
}
