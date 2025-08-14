package com.painel.buffet.demo.rental;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.painel.buffet.demo.clientes.Client;
import com.painel.buffet.demo.utensils.Utensils;
//import com.painel.buffet.demo.dto.RentalsDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class RentalsService {

    private static final String RENTALS_COLLECTION = "rentals";
    private static final String UTENSILS_COLLECTION = "utensilios";


    public Rentals create(Rentals rentals) throws Exception {
        Firestore db = FirestoreClient.getFirestore();

        Utensils utensil = db.collection(UTENSILS_COLLECTION)
                .document(rentals.getUtensilId())
                .get()
                .get()
                .toObject(Utensils.class);

        if (utensil == null) {
            throw new Exception("Utensílio não encontrado");
        }

        if (utensil.getAvailableQuantity() < rentals.getQuantity()) {
        throw new Exception("Não há itens suficientes para alugar");
        }

        utensil.setAvailableQuantity(utensil.getAvailableQuantity() - rentals.getQuantity());
        db.collection(UTENSILS_COLLECTION).document(utensil.getId()).set(utensil).get();

        if (rentals.getId() == null || rentals.getId().isEmpty()) {
            rentals.setId(UUID.randomUUID().toString());
        }

        db.collection(RENTALS_COLLECTION).document(rentals.getId()).set(rentals).get();

        return rentals;
    }

    public Rentals getById(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection(RENTALS_COLLECTION).document(id).get().get().toObject(Rentals.class);
    }

    public List<Rentals> getAll() throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(RENTALS_COLLECTION).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Rentals> rentalsList = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            Rentals rentals = doc.toObject(Rentals.class);
            rentalsList.add(rentals);
        }
        return rentalsList;
    }


    public Rentals update(Rentals rentals, String id) throws Exception{
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(RENTALS_COLLECTION).document(id);
        ApiFuture<WriteResult> future = docRef.set(rentals);
        future.get();
        return docRef.get().get().toObject(Rentals.class);
    }
}