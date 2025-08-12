package com.painel.buffet.demo.utensils;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.painel.buffet.demo.dto.UtensilsDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class UtensilsService {
    private static final String COLLECTION_NAME = "utensilios";

    public Utensils create(Utensils utensil) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        String id = utensil.getId();
        if (id == null || id.isEmpty()) {
            id = UUID.randomUUID().toString();
            utensil.setId(id);
        }
        db.collection(COLLECTION_NAME).document(utensil.getId()).set(utensil).get();
        return utensil;
    }

    public Utensils getById(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(id).get().get().toObject(Utensils.class);
    }

    public List<Utensils> getAll() throws Exception {
    Firestore db = FirestoreClient.getFirestore();
    ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
    List<QueryDocumentSnapshot> documents = future.get().getDocuments();
    List<Utensils> lista = new ArrayList<>();
    for (QueryDocumentSnapshot doc : documents) {
        Utensils u = doc.toObject(Utensils.class);
        lista.add(u);
    }
    return lista;
    }   
}