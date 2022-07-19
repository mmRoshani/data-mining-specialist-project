- Restore:

`After extract data-mining-specialist-project/Task-1/part-A_DataExtraction/Additional/DATABASE-BACKUP/DATABASE-BACKUP.zip`

        ./mongorestore.exe --host localhost --port 28018 --username root --password root_password --db DK <PATH_TO_BACKUP> --authenticationDatabase=admin

---

**Note:** always put the newts database backup after any operation in this folder.
