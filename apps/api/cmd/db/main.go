package main

import (
	"context"
	"flag"
	"log"
	"os"
	"time"
	"zhiyu.local/api/internal/postgres"
)

func main() {
	seed := flag.String("seed", "", "optional path to catalog snapshot")
	flag.Parse()
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	store, err := postgres.Open(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer store.Close()
	if err = store.Migrate(ctx); err != nil {
		log.Fatal(err)
	}
	if *seed != "" {
		if err = store.Seed(ctx, *seed); err != nil {
			log.Fatal(err)
		}
	}
	log.Print("database migrations and requested seed complete")
}
