package main

import (
    "encoding/json"
    "errors"
    "fmt"
    "net/http"
    "strconv"

    "github.com/gorilla/mux"
    "github.com/rs/cors"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
    Age   int    `json:"age"`
}

var users = []User{}

func addUser(w http.ResponseWriter, r *http.Request) {
    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    user.ID = len(users) + 1
    users = append(users, user)
    json.NewEncoder(w).Encode(user)
}

func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func getUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    user, err := getUserByID(id)
    if err != nil {
        http.Error(w, err.Error(), http.StatusNotFound)
        return
    }
    json.NewEncoder(w).Encode(user)
}

func updateUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    var updatedUser User
    if err := json.NewDecoder(r.Body).Decode(&updatedUser); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    user, err := updateUserByID(id, updatedUser.Name, updatedUser.Email, updatedUser.Age)
    if err != nil {
        http.Error(w, err.Error(), http.StatusNotFound)
        return
    }
    json.NewEncoder(w).Encode(user)
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    if err := deleteUserByID(id); err != nil {
        http.Error(w, err.Error(), http.StatusNotFound)
        return
    }
    w.WriteHeader(http.StatusNoContent)
}

func getUserByID(id int) (User, error) {
    for _, user := range users {
        if user.ID == id {
            return user, nil
        }
    }
    return User{}, errors.New("user not found")
}

func updateUserByID(id int, name, email string, age int) (User, error) {
    for i, user := range users {
        if user.ID == id {
            users[i].Name = name
            users[i].Email = email
            users[i].Age = age
            return users[i], nil
        }
    }
    return User{}, errors.New("user not found")
}

func deleteUserByID(id int) error {
    for i, user := range users {
        if user.ID == id {
            users = append(users[:i], users[i+1:]...)
            return nil
        }
    }
    return errors.New("user not found")
}

func main() {
    router := mux.NewRouter()
    router.HandleFunc("/users", addUser).Methods("POST")
    router.HandleFunc("/users", getUsers).Methods("GET")
    router.HandleFunc("/users/{id}", getUser).Methods("GET")
    router.HandleFunc("/users/{id}", updateUser).Methods("PUT")
    router.HandleFunc("/users/{id}", deleteUser).Methods("DELETE")

    // CORS configuration
    corsHandler := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type"},
        AllowCredentials: true,
    }).Handler(router)

    fmt.Println("Server started at :4000")
    http.ListenAndServe(":4000", corsHandler)
}
