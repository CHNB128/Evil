(namespace basic
           (:require [core]))

; integer
(define index 4)
; float
(define pi 3.14)
; string
(define
  ^{:doc "some string var"}
  name "Jack")
; vector example
(define direction [name pi index 17])
; linked list
;(define linked-list (list 4 4 4))
; hash map
;(define sample-hash-map { "name" "Jack" :age 28 })

; (define abs (lambda [number] (- number)))

;(define sad 'asd)

(print direction)