package com.painel.buffet.demo.clientes;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
//import com.painel.buffet.demo.dto.ClientDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class ClientService {
    private static final String COLLECTION_NAME = "clientes";

    public Client create(Client client) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        String id = client.getId();
        if (id == null || id.isEmpty()) {
            id = UUID.randomUUID().toString();
            client.setId(id);
        }
        db.collection(COLLECTION_NAME).document(client.getId()).set(client).get();
        return client;
    }

    public Client getById(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(COLLECTION_NAME).document(id).get().get().toObject(Client.class);
    }

    public List<Client> getAll() throws Exception {
    Firestore db = FirestoreClient.getFirestore();
    ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
    List<QueryDocumentSnapshot> documents = future.get().getDocuments();
    List<Client> lista = new ArrayList<>();
    for (QueryDocumentSnapshot doc : documents) {
        Client u = doc.toObject(Client.class);
        lista.add(u);
    }
    return lista;
    }   
}