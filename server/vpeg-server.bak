#lang racket/base
(require web-server/formlets
         web-server/http
         web-server/http/response-structs
         web-server/http/request-structs
         web-server/servlet-env
         web-server/servlet
         racket/list
         web-server/dispatch
         web-server/templates
         racket/string
         racket/function
         racket/file
         xml)
(require json)


; Function to get value from hash given a key
(define (get-hash-value k v)
  (hash-ref k v))


; file-upload-formlet: formlet (binding?)
(define file-upload-formlet
  (formlet
   (div ,{(file-upload) . => . binds})
   ; returns the file name and contents:
   (let
       ([fname (bytes->string/utf-8 (binding:file-filename binds))]
        [fcontents (binding:file-content binds)])
     (values fname fcontents))))


;read fcontents as json expr
(define (read-file-to-json fcontents)
  (with-input-from-file fcontents (λ () (read-json))))


; show-page: request -> doesn't return
(define (show-page request)
  
  ; Response generator
  (define (response-generator embed/url)
    (response/xexpr
     `(html 
       ,(render-header request)
       (p ((style "color:white;")) "Write your PEG")
       (textarea)
       (p ((style "color:white;")) "Or upload your PEG")
       (form 
        ([action ,(embed/url upload-handler)]
         [method "POST"]
         [enctype "multipart/form-data"])
        ,@(formlet-display file-upload-formlet)
        (input ([type "submit"] [value "Debug"]))))))

  (define (upload-handler request)
    (define-values (fname fcontents)
      (formlet-process file-upload-formlet request))

    (define get-property
      (curry get-hash-value (read-file-to-json fcontents)))

    (define x (get-property 'x))
    (define y (get-property 'y))
    
    (define save-name (string-append "!uploaded-" fname))
    (current-directory (build-path ".."))
    (display-to-file fcontents save-name #:exists 'replace)
    (response/xexpr
     `(html
       (head (title "VPeg - Execution"))
       (body (h2 "File name")
             (p ,fname)
             (h2 "File content")
             ,(render-html-json x y)))))

  (send/suspend/dispatch response-generator))


; To generate html from json
(define (render-html-json x y)
  `(div
    (p (string-append "x: " ,x))
    (p (string-append "y: " ,y))))


; html head
(define (render-header request)
  `(head
    (title "VPeg")
    (meta ((charset "UTF-8")))
    (meta ((name "viewport") (content "width=device-width, initial-scale=1.0, maximum-scale=1.0")))
    (link ((rel "stylesheet")
           (href "https://drive.google.com/uc?export=view&id=1qU-nw8a8eYFQrhWFJNAkjNrdhvNINiHb")
           (type "text/css")))
    ,(render-navigationbar request)))


(define style1 "overflow:hidden; background-color:rgb(57, 57, 57); padding:20px 10px;")
(define style2 "color:white; text-align:center; padding:12px; text-decoration:none; border-radius:4px;")


; render navigation bar
(define (render-navigationbar request)
  `(body ((style "background-color:rgb(45, 45, 45);"))
    (div ((style ,style1))
     (a ((style ,(string-append "float:left; font-size:25px; font-weight:bold; line-height:25px;" style2))) "VPeg")
     (div ((style ,(string-append "float:right; font-size:18px; line-height:25px;" style2)))
      (a ((href "output-debug.html")) "Home ")
      (a "Online Version ")
      (a "Documentation ")
      (a "Development")))
    (p "Teste")))


; Dispatchs
(define-values (dispatcher url-generator)
  (dispatch-rules
   [("") show-page]))


; The entry point
(module+ main
  (serve/servlet
   dispatcher
   #:port 6995
   #:command-line? #f
   ;#:file-not-found-responder not-found
   #:launch-browser? #f
   #:servlet-regexp #rx""
    #:extra-files-paths
    (list
     (build-path "../css")
     (build-path "../js")
     (build-path "../pages"))))