package com.painel.buffet.demo.utensilios;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class UtensilioService {
    private static final String COLLECTION_NAME = "utensilios";

    public String salvar(Utensilios utensilio) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        String id = utensilio.getId();
        if (id == null || id.isEmpty()) {
            id = UUID.randomUUID().toString();
            utensilio.setId(id);
        }
        db.collection(COLLECTION_NAME).document(utensilio.getId()).set(utensilio).get();
        return "Utensílio salvo!";
    }

    public Utensilios buscar(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(id).get().get().toObject(Utensilios.class);
    }

    public List<Utensilios> listarTodos() throws Exception {
    Firestore db = FirestoreClient.getFirestore();
    ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
    List<QueryDocumentSnapshot> documents = future.get().getDocuments();
    List<Utensilios> lista = new ArrayList<>();
    for (QueryDocumentSnapshot doc : documents) {
        Utensilios u = doc.toObject(Utensilios.class);
        lista.add(u);
    }
    return lista;
    }   
}