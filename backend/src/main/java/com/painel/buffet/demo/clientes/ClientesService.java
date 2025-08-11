package com.painel.buffet.demo.clientes;

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
public class ClientesService {
    private static final String COLLECTION_NAME = "clientes";

    public String salvar(Clientes cliente) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        String id = cliente.getId();
        if (id == null || id.isEmpty()) {
            id = UUID.randomUUID().toString();
            cliente.setId(id);
        }
        db.collection(COLLECTION_NAME).document(cliente.getId()).set(cliente).get();
        return "Utensílio salvo!";
    }

    public Clientes buscar(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(id).get().get().toObject(Clientes.class);
    }

    public List<Clientes> listarTodos() throws Exception {
    Firestore db = FirestoreClient.getFirestore();
    ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
    List<QueryDocumentSnapshot> documents = future.get().getDocuments();
    List<Clientes> lista = new ArrayList<>();
    for (QueryDocumentSnapshot doc : documents) {
        Clientes u = doc.toObject(Clientes.class);
        lista.add(u);
    }
    return lista;
    }   
}