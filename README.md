**********************
# WebGIS
## Πτυχιακή Εργασία 
### ΓΙΑΝΝΙΟΣ ΑΝΤΩΝΙΟΣ
### Π2013153


**********************
#### Version 1.7
#### 29-4-2021

- [x] Εμφάνιση route στον χάρτη και στο σχέδιο πτήσης αναλόγως του waypoint που
      εισάγεται <!-- και δυνατότητα γραφικής μεταβολής του με το mouse) -->

![Ver 1.7 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-7.PNG)

**********************
#### Version 1.6
#### 24-4-2021

- [x] Εμφάνιση πάνω στην μπάρα της παγκόσμιας ώρας (UTC) καθώς και της UTC ημερομηνίας κατά ICAO format (Έτος-Μήνας-Ημέρα). Επίσης 
      εμφάνιση των συντεταγμένων που έχει το κέντρο του χάρτη.

![Ver 1.6 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-6.PNG)

**********************
#### Version 1.5
#### 22-4-2021

- [x] Έγινε σμίκρυνση του πλάτους της μπάρας μενού στα 60px ώστε να μπορέσει να προστεθεί η μπάρα πληροφοριών στη βάση του χάρτη.
- [x] Πρόσθεση διάφανης μπάρας στη βάση του χάρτη πάνω στην οποία εμφανίζονται οι συντεταγμένες του κέντρου του χάρτη.
      Στην μπάρα αυτή θα εμφανίζονται οι συντεταγμένες του mouse πάνω στον χάρτη και άλλες πληροφορίες, όπως το πλησιέστερο αεροδρόμιο ή waypoint ή ραδιοβοήθημα
      (navaid) προς το κέντρο του χάρτη.
- [x] Πρόσθεση κουμπιού ('C') με το οποίο μαρκάρεται μονίμως το κέντρο του χάρτη με σταυρό. 
- [x] Δημιουργία φόρμας συμπλήρωσης Flight Plan και πρόσθεση κουμπιού ('F') για την εμφάνισή της.
- [x] Πρόσθεση κουμπιού ('A') για την μετάβαση στο AFTN Terminal. Έγινε διόρθωση του main menu, ώστε να εμφανίζεται η επιλογή του AFTN Terminal.
- [x] Έγινε διόρθωση ώστε να μετακινείται η φόρμα με τα στοιχεία των αεροδρομίων από το A.I.P, χωρίς την χρήση του πλήκτρου control αλλά μόνο με
      mouse drag.
- [x] Έγιναν διορθώσεις στα css των φορμών A.I.P και Flight Plan ώστε το κείμενο πάνω σε αυτές να μην είναι selectable.

![Ver 1.5 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-5.PNG)


**********************
#### Version 1.4
#### 17-4-2021
- [x] Δημιουργία στο map tiler και δεύτερου βασικού χάρτη με αποχρώσεις λευκού και γαλάζιου.
- [x] Πρόσθεση κουμπιού ('Β') με το οποίο αλλάζει ο βασικός χάρτης (base map) από πράσινος σε γαλάζιο.
- [x] Γίνεται πλέον διαχείριση και διαχωρισμός όλων των layers σύμφωνα με το είδος τους. Έτσι, στην εναλλαγή των χαρτών. με το παραπάνω κουμπί, υπολογίζεται η θέση
      που έχει το base layer στο layer stack και αφαιρείται. Επίσης με τον ίδιο τρόπο όταν χρειαστεί να γίνει εμφάνιση του route που έχουν τα αεροσκάφη, το visibility
      (true or false) εμφαρμόζεται μόνο στα route layers.


**********************
#### Version 1.3
#### 11-4-2021

- [x] Επιδιόρθωση του offset και εμφάνιση πλέον στην σωστή θέση των labels από όλα τα layers. (π.χ waypoints, airways κ.λπ). Η επιδιόρθωση έγινε με την τροποποίηση του
      xml αρχείου (SLD) που χρησιμοποιεί ο Geoserver για το styling των layers που σερβίρει.
- [x] Εμφάνιση του route που ακολουθεί κάθε αεροσκάφος με διαφορετικό χρώμα.
- [x] Πρόσθεση κουμπιού ('R') με λειτουργία toggle που είτε εμφανίζει τις πορείες όλων των πτήσεων με διαφορετικό χρώμα (παραπάνω μηχανισμός) είτε όχι. 


**********************
#### Version 1.2
#### 7-4-2021

- [x] Δημιουργία διαφορετικών sprite αεροσκαφών με το καθένα να έχει διαφορετικό
      callsign, διαφορετικό velocity και να αντιστοιχεί σε διαφορετικό object.
      Τα objects προς στιγμήν είναι test arrays αλλά μελλοντικά θα αντιστοιχούν σε αυτά που θα εισάγονται από την BΔ.


**********************
#### Version 1.1
#### 1-4-2021

- [x] Προστέθηκε στο repository ο φάκελος Qgis με το αρχείο του Qgis και τα SLD αρχεία
      των layers τα οποία έγιναν import στον Geoserver
- [x] Προστέθηκε στο repository ο φάκελος postgreSQL_files που περιλαμβάνει τα αρχεία
      που χρησιμοποιήθηκαν για την δημιουργία της ΒΔ


**********************
#### Version 1
#### 31-3-2021
  
- [x] Δημιουργία BaseLayer Map στο Maptiler.com στα χρώματα του χάρτη των radar Π.Ε.Α
- [x] Εισαγωγή στοιχείων και δημιουργία χάρτη στο QGIS
- [x] Στήσιμο του Geoserver και δημιουργία layers IFR low με import από το QGIS
- [x] Καταχώρηση στην ΒΔ των αεροδρομίων, waypoints, airways, navaids (ραδιοβοηθήματα)
- [x] Εμφάνιση Call sign label, Velocity Label, Flight Level label πάνω από το sprite
      του αεροσκάφους
- [x] Δυνατότητα απεικόνισης αεροσκάφους είτε με font αεροσκάφους είτε με απλή κουκίδα
- [x] Δημιουργία βασικού περιβάλλοντος του client
- [x] Δημιουργία μενού με χρήση του bootstrap
- [x] Δημιουργία κουμπιών για Fullscreen, χάρτη VFR, IFR low και IFR high ('V'),('IL'),('IH')
- [x] Κίνηση αεροσκάφους με sprite και αντίστοιχου testing button 
- [x] Δημιουργία του nodejs και δυνατότητα qeuries από τον client στην ΒΔ μέσω του
      nodejs
- [x] Καταχώρηση στοιχείων στη ΒΔ με βάση το AIP για όλα τα αεροδρόμια της Ελλάδος
- [x] Εμφάνιση στοιχείων από το Α.Ι.P (Aeronautical Infromation Publication)
      αεροδρομίων με right click σε διάφανη φόρμα με δυνατότητα μετακίνησης με χρήση του CTRL button και του mouse

   

- [ ] Δημιουργία layers για VFR και IFR high διαδρομές
- [ ] Προτεινόμενες διαδρομές (routes) στο σχέδιο πτήσης σύμφωνα με παλαιότερα
      καταχωρημένα σχέδια
- [ ] Εμφάνιση AFTN addresses στο σχέδιο πτήσης που πρόκειται να αποσταλεί στο δίκτυο
      AFTN
- [ ] Εμφάνιση συχνοτήτων αεροδρομίων και τομέων
- [ ] Παρακολούθηση (active και preview) πορείας ενός αεροσκάφους με teleport άλλον
      χάρτη (split screen)
- [ ] Εμφάνιση Standard Instrument Departure (S.I.D Διαδικασία Αναχώρησης) και
      Standard Arrival
      (ST.AR Διαδικασία Άφιξης) σε εικόνες
- [ ] Εμφάνιση timeslots (αφίξεις και αναχωρήσεις)  από υποβληθέντα σχέδια πτήσης για
      οποιοδήποτε αεροδρόμιο
- [ ] Εμφάνιση και συμπλήρωση Clearance (Διαδικασία απογείωσης) από τον ελεγκτή και το
      σχέδιο πτήσης
- [ ] Ειδοποίηση για NOTAMs αεροδρομίου που πλησιάζει η ημερομηνία λήξης τους και θα
      πρέπει να ανανεωθούν από τον ελεγκτή
- [ ] Εμφάνιση προτεινόμενου διαδρόμου σε σχέση με τον παρόντα άνεμο αεροδρομίου
- [ ] Εμφάνιση προειδοποιήσεων στον χάρτη για επικίνδυνο καιρό με βάση METARs ή TAFs
- [ ] Εμφάνιση resticted περιοχών με βάση ΝΟΤΑΜs
- [ ] Υπολογισμός αν είναι εντός ορίων ώρας VFR ένα σχέδιο πτήσης ή αν το αεροδρόμιο
      προορισμού είναι κλειστό λόγω ωραρίου
- [ ] Flight Data Processing και AFTN Data Processing 
- [ ] Drag and Drop στον χάρτη νέου αεροσκάφους που καλεί τον Πύργο Ελέγχου
      Αεροδρομίου και δεν έχει σχέδιο πτήσης (Π.Ε.Α)
      και δυνατότητα απεικόνισης παρούσας θέσης στον χάρτη με βάση τα στοιχεία που αυτό δίνει στον αέρα
- [ ] ΝΟΤΑΜs
- [ ] METARs





         
