import { Service, Provider } from "@/types/types";

export const dummyEarningsData = [
  {
    id: 1,
    date: '2024-09-01',
    service: 'Massage Therapy',
    amount: 150.00,
  },
  {
    id: 2,
    date: '2024-09-02',
    service: 'Facial Treatment',
    amount: 200.00,
  },
  {
    id: 3,
    date: '2024-09-03',
    service: 'Haircut',
    amount: 75.00,
  },
  {
    id: 4,
    date: '2024-09-04',
    service: 'Manicure',
    amount: 50.00,
  },
  {
    id: 5,
    date: '2024-09-05',
    service: 'Pedicure',
    amount: 60.00,
  },
  {
    id: 6,
    date: '2024-09-06',
    service: 'Full Body Massage',
    amount: 220.00,
  },
  {
    id: 7,
    date: '2024-09-07',
    service: 'Skin Care Consultation',
    amount: 130.00,
  },
  {
    id: 8,
    date: '2024-09-08',
    service: 'Deep Tissue Massage',
    amount: 180.00,
  },
  {
    id: 9,
    date: '2024-09-09',
    service: 'Hair Coloring',
    amount: 250.00,
  },
  {
    id: 10,
    date: '2024-09-10',
    service: 'Spa Day Package',
    amount: 500.00,
  },
  {
    id: 11,
    date: '2024-09-11',
    service: 'Aromatherapy',
    amount: 120.00,
  },
  {
    id: 12,
    date: '2024-09-12',
    service: 'Nail Art',
    amount: 90.00,
  },
  {
    id: 13,
    date: '2024-09-13',
    service: 'Reflexology',
    amount: 180.00,
  },
  {
    id: 14,
    date: '2024-09-14',
    service: 'Lymphatic Drainage',
    amount: 300.00,
  },
  {
    id: 15,
    date: '2024-09-15',
    service: 'Hot Stone Massage',
    amount: 250.00,
  },
];
export const dummyBookings = [
  {
    id: 1,
    clientName: 'Alice Johnson',
    service: 'Massage Therapy',
    dateTime: '2024-09-15T10:00:00Z',
    status: 'Upcoming'
  },
  {
    id: 2,
    clientName: 'Bob Smith',
    service: 'Facial',
    dateTime: '2024-09-10T14:00:00Z',
    status: 'Completed'
  },
  {
    id: 3,
    clientName: 'Carol Davis',
    service: 'Pedicure',
    dateTime: '2024-09-12T11:00:00Z',
    status: 'Canceled'
  },
  {
    id: 4,
    clientName: 'David Lee',
    service: 'Haircut',
    dateTime: '2024-09-20T09:00:00Z',
    status: 'Upcoming'
  }
];
export const recurringBookings = [
  {
    id: 1,
    clientName: "John Doe",
    service: "Weekly Massage",
    recurrence: "Weekly",
    nextBooking: "2024-09-10 14:00",
    endDate: "2024-12-31",
    occurrences: 12,
    status: "Upcoming",
  },
  {
    id: 2,
    clientName: "Jane Smith",
    service: "Monthly Haircut",
    recurrence: "Monthly",
    nextBooking: "2024-09-15 10:00",
    endDate: "2025-06-15",
    occurrences: 10,
    status: "Upcoming",
  },
  {
    id: 3,
    clientName: "Michael Green",
    service: "Bi-weekly Personal Training",
    recurrence: "Bi-weekly",
    nextBooking: "2024-09-12 09:00",
    endDate: "2025-01-30",
    occurrences: 8,
    status: "Upcoming",
  },
];

export const servicesData: Service[] = [
  {
    id: 1,
    name: 'Full Body Massage',
    description: `
        The Full Body Massage is the ultimate relaxing experience designed to ease muscle tension, relieve stress, 
        and promote overall well-being. This massage covers all major areas of the body, including the back, neck, 
        shoulders, arms, legs, and feet, using long, gentle strokes combined with moderate pressure. Ideal for stress 
        relief, improving circulation, and alleviating muscle stiffness. The use of high-quality, aromatic oils enhances 
        the experience, leaving your skin hydrated and your senses calmed.
      `,
    price: 100,
    duration: '1 hour',
    image: '/assets/services/massage.jpg',
    providerName: 'Jane Doe',
    providerId: 1,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223

  },
  {
    id: 2,
    name: 'Deep Tissue Massage',
    description: `
        The Deep Tissue Massage is perfect for those who need deeper, more intense muscle relief. Focusing on the deeper 
        layers of muscle and connective tissue, this massage uses slow strokes and deep pressure techniques to alleviate 
        chronic pain, reduce muscle tension, and promote faster healing in injury-prone areas. It's especially effective 
        for athletes or anyone suffering from muscle knots and stiffness.
      `,
    price: 120,
    duration: '1.5 hours',
    image: '/assets/services/deep-tissue.jpg',
    providerName: 'John Smith',
    providerId: 2,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223
  },
  {
    id: 3,
    name: 'Aromatherapy Massage',
    description: `
        Experience ultimate relaxation with the Aromatherapy Massage, where the healing power of essential oils meets 
        soothing massage techniques. This massage is designed to relax both your body and mind, using therapeutic-grade 
        essential oils that are absorbed through your skin and inhaled to promote physical and emotional well-being. 
        Each session can be customized based on your needs, whether you want to reduce stress, improve sleep, or boost 
        energy levels.
      `,
    price: 90,
    duration: '1 hour',
    image: '/assets/services/aromatherapy.jpg',
    providerName: 'Emily Johnson',
    providerId: 3,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223
  },
  {
    id: 4,
    name: 'Swedish Massage',
    description: `
        The Swedish Massage is a gentle yet effective full-body treatment designed to ease muscle tension and promote 
        relaxation. This technique uses long, flowing strokes in the direction of blood returning to the heart, combined 
        with kneading and circular motions to enhance circulation and relieve tension. Perfect for first-timers or anyone 
        looking for a soothing, light-pressure massage to reduce stress and anxiety.
      `,
    price: 80,
    duration: '45 minutes',
    image: '/assets/services/swedish-massage.jpg',
    providerName: 'Sarah Lee',
    providerId: 4,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223
  },
  {
    id: 5,
    name: 'Hot Stone Massage',
    description: `
        The Hot Stone Massage takes relaxation to another level by incorporating heated basalt stones into your massage 
        therapy. These warm stones are placed on key points of your body and used to massage tight muscles, enhancing 
        blood flow and deeply relaxing both body and mind. Ideal for those who want a soothing experience with the added 
        benefit of heat therapy to ease tension and improve circulation.
      `,
    price: 130,
    duration: '2 hours',
    image: '/assets/services/hot-stone.jpg',
    providerName: 'Mark Wilson',
    providerId: 6,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223
  },
  {
    id: 6,
    name: 'Sports Massage',
    description: `
        Designed for athletes or active individuals, the Sports Massage focuses on preventing and treating injuries, 
        improving performance, and promoting recovery. This deep, targeted treatment can include stretching, deep 
        tissue work, and muscle manipulation to enhance flexibility and reduce the risk of injury. It's ideal for those 
        looking to recover after intense physical activity or to prepare for upcoming sports events.
      `,
    price: 110,
    duration: '1 hour',
    image: '/assets/services/sports-massage.jpg',
    providerName: 'Anna Brown',
    providerId: 78,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223
  },
  {
    id: 7,
    name: 'Pregnancy Massage',
    description: `
        The Pregnancy Massage is a gentle, specially designed treatment to ease the discomforts of pregnancy. Focusing 
        on areas prone to tension, like the lower back, legs, and shoulders, this massage helps alleviate swelling, 
        reduce stress, and improve sleep quality. Our skilled therapist uses supportive cushions and safe techniques 
        to ensure both you and your baby are comfortable and relaxed throughout the session.
      `,
    price: 95,
    duration: '1 hour',
    image: '/assets/services/pregnancy-massage.jpg',
    providerName: 'Laura White',
    providerId: 7,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223

  },
  {
    id: 8,
    name: 'Reflexology',
    description: `
        Reflexology is a therapeutic foot massage that applies pressure to specific points on the feet, which correspond 
        to different organs and systems in the body. This treatment helps to restore balance and relieve tension, 
        promoting relaxation and overall wellness. Reflexology is known to improve circulation, reduce stress, and 
        support the body’s natural healing processes.
      `,
    price: 85,
    duration: '45 minutes',
    image: '/assets/services/reflexology.jpg',
    providerName: 'Tom Green',
    providerId: 8,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223
  },
  {
    id: 9,
    name: 'Shiatsu Massage',
    description: `
        Shiatsu is a traditional Japanese massage that uses finger and palm pressure, stretching, and other techniques 
        to balance the body’s energy flow, known as "Qi." This massage aims to improve circulation, reduce stress, and 
        promote healing by working along energy meridians. Shiatsu is an excellent choice for those looking for a holistic 
        approach to relieving pain and restoring vitality.
      `,
    price: 115,
    duration: '1 hour',
    image: '/assets/services/shiatsu-massage.jpg',
    providerName: 'Hana Kim',
    providerId: 9,
    latitude: -1.286389,  // Example coordinates for Nairobi, Kenya
    longitude: 36.817223
  },
  {
    id: 10,
    name: 'Thai Massage',
    description: `
        Thai Massage is an ancient healing system that combines acupressure, Ayurvedic principles, and assisted yoga postures. 
        This dynamic treatment involves deep, rhythmic compressions and stretches that increase flexibility and relieve 
        muscle and joint tension. Ideal for those looking for a more active, therapeutic experience, this massage will 
        leave you feeling balanced, refreshed, and energized.
      `,
    price: 140,
    duration: '1.5 hours',
    image: '/assets/services/thai-massage.jpg',
    providerName: 'Liam Lee',
    providerId: 10
  },
  {
    id: 11,
    name: 'Hot Tub Massage',
    description: `
        The Hot Tub Massage is the ultimate indulgence. Enjoy a relaxing massage while soaking in a warm, bubbling hot tub. 
        The combination of water therapy and soothing massage techniques helps relieve muscle tension, improve circulation, 
        and leave you feeling deeply relaxed. Perfect for those looking for an extra layer of comfort and stress relief 
        during their massage session.
      `,
    price: 150,
    duration: '1 hour',
    image: '/assets/services/hot-tub.jpg',
    providerName: 'Emily Roberts',
    providerId: 11
  },
  {
    id: 12,
    name: 'Foot Spa',
    description: `
        A Foot Spa is a blissful treatment designed to soothe and rejuvenate tired feet. This experience includes a foot 
        soak, exfoliation, and a targeted foot massage to relieve stress and improve circulation. Whether you’ve been on 
        your feet all day or just want to pamper yourself, this quick yet effective treatment will leave your feet feeling 
        refreshed and revitalized.
      `,
    price: 70,
    duration: '30 minutes',
    image: '/assets/services/foot-spa.jpg',
    providerName: 'Michael Johnson',
    providerId: 12
  }
];
// data/providersData.ts
export const providersData: Provider[] = [
  {
    id: 1,
    name: 'Jane Doe',
    bio: `
      Jane Doe is a seasoned massage therapist with over 12 years of experience, specializing in Full Body Massage.
      Jane is dedicated to providing a personalized massage experience tailored to each client's needs, aiming to
      alleviate stress and promote overall wellness.
    `,
    certifications: [
      'Certified Massage Therapist (CMT)',
      '12+ Years of Experience',
      'Specialized in Full Body Massage, Aromatherapy, and Swedish Massage',
      'Licensed by the National Board for Therapeutic Massage & Bodywork (NCBTMB)'
    ],
    approach: `
      Jane adopts a holistic approach, focusing on the mind-body connection. Her techniques combine relaxation
      with therapeutic benefits, ensuring a restorative experience for each client.
    `,
    contact: {
      email: 'jane.doe@example.com',
      phone: '(555) 123-4567'
    },
    reviews: [
      {
        clientName: 'Alice Johnson',
        reviewText: 'Jane is absolutely fantastic! Her full-body massage left me feeling incredibly relaxed and rejuvenated.'
      },
      {
        clientName: 'Mark Brown',
        reviewText: 'The best massage I have ever had. Jane’s technique is unmatched, and she truly knows how to relieve tension.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/jane.doe',
      instagram: 'https://instagram.com/jane.doe',
      twitter: 'https://twitter.com/jane_doe'
    }
  },
  {
    id: 2,
    name: 'John Smith',
    bio: `
      John Smith is a highly skilled massage therapist with a focus on Deep Tissue Massage. With over 15 years in the
      industry, John brings a wealth of experience and knowledge to his practice, ensuring effective relief from
      chronic pain and muscle tension.
    `,
    certifications: [
      'Licensed Massage Therapist (LMT)',
      '15+ Years of Experience',
      'Specialized in Deep Tissue Massage, Sports Massage, and Reflexology',
      'Certified by the American Massage Therapy Association (AMTA)'
    ],
    approach: `
      John’s approach integrates deep tissue techniques with a focus on targeted muscle relief, aiming to improve
      flexibility and reduce pain through customized treatment plans.
    `,
    contact: {
      email: 'john.smith@example.com',
      phone: '(555) 987-6543'
    },
    reviews: [
      {
        clientName: 'Linda Lee',
        reviewText: 'John’s deep tissue massage was exactly what I needed. My chronic back pain has significantly improved.'
      },
      {
        clientName: 'David Wilson',
        reviewText: 'Highly recommend John for anyone dealing with muscle tension. His expertise and techniques are top-notch.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/john.smith',
      instagram: 'https://instagram.com/john.smith',
      twitter: 'https://twitter.com/john_smith'
    }
  },
  {
    id: 3,
    name: 'Emily Johnson',
    bio: `
      Emily Johnson specializes in Aromatherapy Massage and has been in the field for over 8 years. Her focus is on
      using essential oils to enhance relaxation and overall well-being.
    `,
    certifications: [
      'Certified Aromatherapist',
      '8+ Years of Experience',
      'Specialized in Aromatherapy, Swedish Massage, and Hot Stone Massage',
      'Certified by the International Aromatherapy and Integrative Medicine Association (AIIMA)'
    ],
    approach: `
      Emily combines the therapeutic benefits of essential oils with traditional massage techniques to create a
      personalized experience that promotes relaxation and emotional balance.
    `,
    contact: {
      email: 'emily.johnson@example.com',
      phone: '(555) 321-4567'
    },
    reviews: [
      {
        clientName: 'Jessica Turner',
        reviewText: 'Emily’s aromatherapy massage was a wonderful experience. The essential oils she used helped me relax deeply.'
      },
      {
        clientName: 'Chris Evans',
        reviewText: 'A fantastic massage that left me feeling refreshed. Emily’s attention to detail and use of essential oils made a huge difference.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/emily.johnson',
      instagram: 'https://instagram.com/emily.johnson',
      twitter: 'https://twitter.com/emily_johnson'
    }
  },
  {
    id: 4,
    name: 'Sarah Lee',
    bio: `
      Sarah Lee is a renowned massage therapist known for her expertise in Swedish Massage. With over 10 years of
      experience, Sarah is committed to delivering a relaxing and effective massage experience to her clients.
    `,
    certifications: [
      'Certified Massage Therapist (CMT)',
      '10+ Years of Experience',
      'Specialized in Swedish Massage, Hot Stone Massage, and Aromatherapy',
      'Licensed by the American Massage Therapy Association (AMTA)'
    ],
    approach: `
      Sarah’s approach focuses on gentle, therapeutic techniques that promote relaxation and stress relief, ensuring
      a calming experience for each client.
    `,
    contact: {
      email: 'sarah.lee@example.com',
      phone: '(555) 654-3210'
    },
    reviews: [
      {
        clientName: 'Amanda Green',
        reviewText: 'Sarah’s Swedish massage was incredibly relaxing. I felt all my stress melt away during the session.'
      },
      {
        clientName: 'Tom Rogers',
        reviewText: 'A wonderful experience. Sarah’s technique and attention to detail made for a very soothing massage.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/sarah.lee',
      instagram: 'https://instagram.com/sarah.lee',
      twitter: 'https://twitter.com/sarah_lee'
    }
  },
  {
    id: 5,
    name: 'Mark Wilson',
    bio: `
      Mark Wilson is a dedicated massage therapist with expertise in Hot Stone Massage. With 14 years in the field,
      Mark offers a soothing experience that combines heat therapy with traditional massage techniques.
    `,
    certifications: [
      'Licensed Massage Therapist (LMT)',
      '14+ Years of Experience',
      'Specialized in Hot Stone Massage, Deep Tissue Massage, and Sports Massage',
      'Certified by the National Certification Board for Therapeutic Massage & Bodywork (NCBTMB)'
    ],
    approach: `
      Mark’s approach integrates heat therapy with therapeutic massage techniques, focusing on deep relaxation and
      muscle tension relief.
    `,
    contact: {
      email: 'mark.wilson@example.com',
      phone: '(555) 789-0123'
    },
    reviews: [
      {
        clientName: 'Natalie Adams',
        reviewText: 'Mark’s hot stone massage was exceptional. The heat combined with his expert technique made for a deeply relaxing session.'
      },
      {
        clientName: 'Eric Turner',
        reviewText: 'I’ve had many massages, but Mark’s hot stone massage was by far the best. The warmth of the stones was soothing and therapeutic.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/mark.wilson',
      instagram: 'https://instagram.com/mark.wilson',
      twitter: 'https://twitter.com/mark_wilson'
    }
  },
  {
    id: 6,
    name: 'Anna Brown',
    bio: `
      Anna Brown is an experienced massage therapist specializing in Sports Massage. With 11 years of practice, Anna
      focuses on enhancing athletic performance and aiding recovery through targeted treatments.
    `,
    certifications: [
      'Certified Sports Massage Therapist',
      '11+ Years of Experience',
      'Specialized in Sports Massage, Deep Tissue Massage, and Reflexology',
      'Certified by the International Sports Massage Association (ISMA)'
    ],
    approach: `
      Anna uses a combination of deep tissue work and stretching techniques to improve flexibility, prevent injuries,
      and support athletic performance.
    `,
    contact: {
      email: 'anna.brown@example.com',
      phone: '(555) 345-6789'
    },
    reviews: [
      {
        clientName: 'Sophia Lee',
        reviewText: 'Anna’s sports massage was perfect for my post-workout recovery. She knows exactly how to target those sore muscles.'
      },
      {
        clientName: 'Ryan Wilson',
        reviewText: 'Highly recommend Anna for athletes. Her sports massage helped me recover quickly and reduced my muscle soreness significantly.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/anna.brown',
      instagram: 'https://instagram.com/anna.brown',
      twitter: 'https://twitter.com/anna_brown'
    }
  },
  {
    id: 7,
    name: 'Laura White',
    bio: `
      Laura White is a licensed massage therapist with over 10 years of experience, specializing in Pregnancy Massage.
      Laura takes pride in offering customized treatments based on each client's specific needs.
    `,
    certifications: [
      'Certified Massage Therapist (CMT)',
      '10+ Years of Experience',
      'Specialized in Pregnancy Massage, Deep Tissue, Reflexology, and Sports Massage',
      'Licensed by the National Board for Therapeutic Massage & Bodywork (NCBTMB)'
    ],
    approach: `
      Laura believes in a holistic approach to massage therapy, combining relaxation with therapeutic benefits.
      Each session is tailored to the individual's physical and emotional needs, ensuring a complete experience of
      rejuvenation and healing.
    `,
    contact: {
      email: 'laura.white@example.com',
      phone: '(555) 456-7890'
    },
    reviews: [
      {
        clientName: 'Emily Carter',
        reviewText: 'Laura’s pregnancy massage was a lifesaver during my third trimester. It eased my back pain and helped me sleep better.'
      },
      {
        clientName: 'Olivia Harris',
        reviewText: 'Such a soothing experience! Laura’s attention to comfort and safety made me feel completely at ease.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/laura.white',
      instagram: 'https://instagram.com/laura.white',
      twitter: 'https://twitter.com/laura_white'
    }
  },
  {
    id: 8,
    name: 'Tom Green',
    bio: `
      Tom Green is a skilled massage therapist specializing in Reflexology. With over 9 years of experience, Tom focuses
      on therapeutic treatments that restore balance and promote wellness through targeted foot massage techniques.
    `,
    certifications: [
      'Certified Reflexologist',
      '9+ Years of Experience',
      'Specialized in Reflexology, Swedish Massage, and Hot Stone Massage',
      'Certified by the American Reflexology Certification Board (ARCB)'
    ],
    approach: `
      Tom’s approach uses pressure points on the feet to balance energy and relieve tension, aiming to improve overall
      well-being and support the body’s natural healing processes.
    `,
    contact: {
      email: 'tom.green@example.com',
      phone: '(555) 567-8901'
    },
    reviews: [
      {
        clientName: 'James Parker',
        reviewText: 'Tom’s reflexology session was incredible. It helped relieve tension and improve my overall sense of well-being.'
      },
      {
        clientName: 'Rachel Scott',
        reviewText: 'A truly relaxing experience. Tom’s reflexology techniques are very effective and left my feet feeling fantastic.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/tom.green',
      instagram: 'https://instagram.com/tom.green',
      twitter: 'https://twitter.com/tom_green'
    }
  },
  {
    id: 9,
    name: 'Hana Kim',
    bio: `
      Hana Kim is a proficient massage therapist with expertise in Shiatsu Massage. With a decade of experience, Hana
      integrates traditional Japanese techniques to balance energy flow and promote healing.
    `,
    certifications: [
      'Certified Shiatsu Practitioner',
      '10+ Years of Experience',
      'Specialized in Shiatsu Massage, Deep Tissue Massage, and Thai Massage',
      'Certified by the Shiatsu School of Tokyo'
    ],
    approach: `
      Hana uses finger and palm pressure techniques along energy meridians to improve circulation and reduce stress,
      aiming to restore vitality and balance.
    `,
    contact: {
      email: 'hana.kim@example.com',
      phone: '(555) 678-9012'
    },
    reviews: [
      {
        clientName: 'Jared Murphy',
        reviewText: 'Hana’s shiatsu massage was a unique and beneficial experience. I felt more balanced and less stressed afterward.'
      },
      {
        clientName: 'Mia Nguyen',
        reviewText: 'An excellent shiatsu massage. Hana’s skillful pressure techniques helped alleviate my chronic pain effectively.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/hana.kim',
      instagram: 'https://instagram.com/hana.kim',
      twitter: 'https://twitter.com/hana_kim'
    }
  },
  {
    id: 10,
    name: 'Jake Adams',
    bio: `
      Jake Adams is a massage therapist with a focus on Neuromuscular Therapy. With over 13 years in the field, Jake
      specializes in relieving chronic pain and muscular imbalances through targeted therapy.
    `,
    certifications: [
      'Certified Neuromuscular Therapist',
      '13+ Years of Experience',
      'Specialized in Neuromuscular Therapy, Deep Tissue Massage, and Myofascial Release',
      'Certified by the National Certification Board for Therapeutic Massage & Bodywork (NCBTMB)'
    ],
    approach: `
      Jake’s approach combines deep tissue techniques with neuromuscular therapy to address pain and dysfunction,
      aiming for improved muscular function and pain relief.
    `,
    contact: {
      email: 'jake.adams@example.com',
      phone: '(555) 789-2345'
    },
    reviews: [
      {
        clientName: 'Amanda Hughes',
        reviewText: 'Jake’s Thai massage was both invigorating and relaxing. The combination of stretching and massage techniques was fantastic.'
      },
      {
        clientName: 'Ethan Foster',
        reviewText: 'A great Thai massage experience! Jake’s approach improved my flexibility and left me feeling revitalized.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/jake.adams',
      instagram: 'https://instagram.com/jake.adams',
      twitter: 'https://twitter.com/jake_adams'
    }
  },
  {
    id: 11,
    name: 'Sophie Davis',
    bio: `
      Sophie Davis is a highly experienced massage therapist specializing in Lomi Lomi Massage. With 7 years in the
      field, Sophie offers a unique Hawaiian technique that combines flowing strokes and rhythmic pressure.
    `,
    certifications: [
      'Certified Lomi Lomi Practitioner',
      '7+ Years of Experience',
      'Specialized in Lomi Lomi Massage, Swedish Massage, and Aromatherapy',
      'Certified by the Hawaii Lomi Lomi Association'
    ],
    approach: `
      Sophie’s approach uses long, flowing strokes and rhythmic pressure to create a deep sense of relaxation and
      rejuvenation, aiming to restore balance and harmony in the body.
    `,
    contact: {
      email: 'sophie.davis@example.com',
      phone: '(555) 890-1234'
    },
    reviews: [
      {
        clientName: 'Olivia Bennett',
        reviewText: 'Sophie’s hot tub massage was the ultimate relaxation. The hot tub combined with her massage techniques was pure bliss.'
      },
      {
        clientName: 'Samantha Green',
        reviewText: 'A truly luxurious experience. Sophie’s massage while in the hot tub helped me unwind completely.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/sophie.davis',
      instagram: 'https://instagram.com/sophie.davis',
      twitter: 'https://twitter.com/sophie_davis'
    }
  },
  {
    id: 12,
    name: 'Alex Martinez',
    bio: `
      Alex Martinez is a versatile massage therapist with expertise in Thai Massage. With 5 years of experience, Alex
      combines traditional Thai techniques with modern practices to enhance flexibility and relieve stress.
    `,
    certifications: [
      'Certified Thai Massage Practitioner',
      '5+ Years of Experience',
      'Specialized in Thai Massage, Deep Tissue Massage, and Swedish Massage',
      'Certified by the Thai Massage Association'
    ],
    approach: `
      Alex’s approach incorporates stretching and pressure techniques to improve flexibility and reduce stress,
      aiming to offer a balanced and holistic massage experience.
    `,
    contact: {
      email: 'alex.martinez@example.com',
      phone: '(555) 901-2345'
    },
    reviews: [
      {
        clientName: 'Sophia Moore',
        reviewText: 'Alex’s foot spa treatment was incredibly refreshing. The massage and exfoliation left my feet feeling wonderful.'
      },
      {
        clientName: 'Jacob Brown',
        reviewText: 'Excellent foot spa experience. Alex’s technique was gentle and thorough, making it a perfect way to relax after a long day.'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/alex.martinez',
      instagram: 'https://instagram.com/alex.martinez',
      twitter: 'https://twitter.com/alex_martinez'
    }
  }
];
