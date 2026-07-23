import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useInView } from '../hooks/useInView';

type Slide = { src: string; caption?: string };

type Project = {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  season: string;
  location: string;
  author: string;
  aspect: string;
  timelinePos: number;
  slides: Slide[];
};

const PROJECTS: Project[] = [
  {
    id: 6, title: 'Ode',
    subtitle: 'Re-forming the Anthropocene: A Center for Regenerative Building',
    year: 'Lyceum Fellowship 2024', season: 'Spring 2024', location: 'Grove Park, Atlanta, GA', author: 'Lyriel Todd',
    aspect: 'aspect-[16/9]', timelinePos: 4,
    slides: [
      { src: '/images/ode/01_Ode_Cover.jpg' },
      { src: '/images/ode/02_Site_Mapping.jpg', caption: 'Site exploitation: cultural & natural' },
      { src: '/images/ode/03_Model.jpg', caption: 'Physical model: natural vs. cultural' },
      { src: '/images/ode/04_Elevations.jpg', caption: 'Elevations' },
      { src: '/images/ode/05_Macro_Mapping.jpg', caption: 'Cultural/natural transformations' },
      { src: '/images/ode/06_Site_Plan.jpg', caption: 'Site plan' },
      { src: '/images/ode/07_Bridge_Render.jpg', caption: 'Interior render: material field' },
      { src: '/images/ode/08_Axon.jpg', caption: 'Material regeneration & reuse' },
      { src: '/images/ode/09_Plans_and_Sections.jpg', caption: 'Floor plans & sections' },
      { src: '/images/ode/10_Hostile_Render.jpg', caption: 'Catwalk view' },
    ],
  },
  {
    id: 5, title: 'Proctor Creek',
    subtitle: 'What happens when we stop looking',
    year: '2024', season: 'Spring 2024', location: 'Westside Park, Atlanta, GA', author: 'Lyriel Todd',
    aspect: 'aspect-[4/3]', timelinePos: 4,
    slides: [
      { src: '/images/Proctor Creek/01_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/02_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/03_Proctor_Creek.jpg', caption: 'For my first project, I decided to walk down the river and count every brick I found.' },
      { src: '/images/Proctor Creek/04_Proctor_Creek.jpg', caption: 'I don\'t think the number of bricks lost in the river was what I was actually looking for.' },
      { src: '/images/Proctor Creek/05_Proctor_Creek.jpg', caption: 'But all of the things I found along the way.' },
      { src: '/images/Proctor Creek/06_Proctor_Creek.jpg', caption: 'This is such a beautiful place.' },
      { src: '/images/Proctor Creek/07_Proctor_Creek.jpg', caption: 'And also such a damaged place.' },
      { src: '/images/Proctor Creek/08_Proctor_Creek.jpg', caption: 'How can something look normal, but feel wrong?' },
      { src: '/images/Proctor Creek/09_Proctor_Creek.jpg', caption: 'How can it be both?' },
      { src: '/images/Proctor Creek/10_Proctor_Creek.jpg', caption: 'Beautiful, but damaged.' },
      { src: '/images/Proctor Creek/11_Proctor_Creek.jpg', caption: 'Normal, but wrong.' },
      { src: '/images/Proctor Creek/12_Proctor_Creek.jpg', caption: 'Visible, but overlooked.' },
      { src: '/images/Proctor Creek/13_Proctor_Creek.jpg', caption: 'Making our way up the river.' },
      { src: '/images/Proctor Creek/14_Proctor_Creek.jpg', caption: 'What is abandoned becomes a home for others.' },
      { src: '/images/Proctor Creek/15_Proctor_Creek.jpg', caption: 'The bricks are remnants of the Atlanta Brick company.' },
      { src: '/images/Proctor Creek/16_Proctor_Creek.jpg', caption: 'The trash are the traces of us.' },
      { src: '/images/Proctor Creek/17_Proctor_Creek.jpg', caption: 'Life twists and distorts, growing around the wound.' },
      { src: '/images/Proctor Creek/18_Proctor_Creek.jpg', caption: 'The roots of a tree are for connection and growth, but here they are torn out and heavy with discarded object.' },
      { src: '/images/Proctor Creek/19_Proctor_Creek.jpg', caption: 'Not all trash is litter.' },
      { src: '/images/Proctor Creek/20_Proctor_Creek.jpg', caption: 'Much of it is just lost.' },
      { src: '/images/Proctor Creek/21_Proctor_Creek.jpg', caption: 'But everything that is lost finds its way to the river eventually.' },
      { src: '/images/Proctor Creek/22_Proctor_Creek.jpg', caption: 'All that is uncared for.' },
      { src: '/images/Proctor Creek/23_Proctor_Creek.jpg', caption: 'Forgotten' },
      { src: '/images/Proctor Creek/24_Proctor_Creek.jpg', caption: 'Dismissed' },
      { src: '/images/Proctor Creek/25_Proctor_Creek.jpg', caption: 'Abandoned' },
      { src: '/images/Proctor Creek/26_Proctor_Creek.jpg', caption: 'Ignored' },
      { src: '/images/Proctor Creek/27_Proctor_Creek.jpg', caption: 'Erased' },
      { src: '/images/Proctor Creek/28_Proctor_Creek.jpg', caption: 'Discarded' },
      { src: '/images/Proctor Creek/29_Proctor_Creek.jpg', caption: 'Lost' },
      { src: '/images/Proctor Creek/30_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/31_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/32_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/33_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/34_Proctor_Creek.jpg', caption: 'I walked through the river and counted every brick.' },
      { src: '/images/Proctor Creek/35_Proctor_Creek.jpg', caption: 'And took a photo of each one too.' },
      { src: '/images/Proctor Creek/36_Proctor_Creek.jpg', caption: 'If I gave them to you, would you look through them all?' },
      { src: '/images/Proctor Creek/37_Proctor_Creek.jpg', caption: 'But I already put them all in my project...' },
      { src: '/images/Proctor Creek/38_Proctor_Creek.jpg', caption: 'Did you see it?' },
      { src: '/images/Proctor Creek/39_Proctor_Creek.jpg', caption: 'Did you look?' },
      { src: '/images/Proctor Creek/40_Proctor_Creek.jpg', caption: 'Or did you see.' },
      { src: '/images/Proctor Creek/42_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/43_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/44_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/45_Proctor_Creek.jpg', caption: 'Is it still hiding?' },
      { src: '/images/Proctor Creek/46_Proctor_Creek.jpg', caption: 'If everyone can see it.' },
      { src: '/images/Proctor Creek/47_Proctor_Creek.jpg', caption: 'Perception without feeling is blindness.' },
      { src: '/images/Proctor Creek/48_Proctor_Creek.jpg', caption: 'Small hands, tiny hands - momma and babies - possums hands are similar to our own.' },
      { src: '/images/Proctor Creek/49_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/50_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/51_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/52_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/53_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/54_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/55_Proctor_Creek.jpg', caption: 'Between a brick and a hard place.' },
      { src: '/images/Proctor Creek/56_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/57_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/58_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/59_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/60_Proctor_Creek.jpg', caption: 'I could tell you how many bricks I counted.' },
      { src: '/images/Proctor Creek/61_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/62_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/63_Proctor_Creek.jpg', caption: 'But then you would never bother to count them yourself.' },
      { src: '/images/Proctor Creek/64_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/65_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/66_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/67_Proctor_Creek.jpg', caption: 'And the counting is the point.' },
      { src: '/images/Proctor Creek/68_Proctor_Creek.jpg', caption: 'A beautiful world' },
      { src: '/images/Proctor Creek/69_Proctor_Creek.jpg', caption: 'Harmed by our touch' },
      { src: '/images/Proctor Creek/70_Proctor_Creek.jpg', caption: 'Harmed by our ways of caring for one another' },
      { src: '/images/Proctor Creek/71_Proctor_Creek.jpg', caption: 'Here is the split' },
      { src: '/images/Proctor Creek/72_Proctor_Creek.jpg', caption: 'The fallen leaves on the ground are no different than' },
      { src: '/images/Proctor Creek/73_Proctor_Creek.jpg', caption: 'plastic bags in the wind' },
      { src: '/images/Proctor Creek/74_Proctor_Creek.jpg', caption: 'empty cans' },
      { src: '/images/Proctor Creek/75_Proctor_Creek.jpg', caption: 'used tires' },
      { src: '/images/Proctor Creek/76_Proctor_Creek.jpg', caption: 'forgotten CDs' },
      { src: '/images/Proctor Creek/77_Proctor_Creek.jpg', caption: 'bricks mixed with stone' },
      { src: '/images/Proctor Creek/78_Proctor_Creek.jpg', caption: 'sand mixed with glass' },
      { src: '/images/Proctor Creek/79_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/80_Proctor_Creek.jpg', caption: 'They are not opposites.' },
      { src: '/images/Proctor Creek/81_Proctor_Creek.jpg', caption: 'They are the things we leave behind.' },
      { src: '/images/Proctor Creek/82_Proctor_Creek.jpg', caption: 'What we leave behind becomes leaves for others.' },
      { src: '/images/Proctor Creek/83_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/84_Proctor_Creek.jpg', caption: 'Crane feet' },
      { src: '/images/Proctor Creek/85_Proctor_Creek.jpg', caption: 'Someone was here before us.' },
      { src: '/images/Proctor Creek/86_Proctor_Creek.jpg', caption: 'Deer tracks' },
      { src: '/images/Proctor Creek/87_Proctor_Creek.jpg', caption: 'And someone will be here after.' },
      { src: '/images/Proctor Creek/88_Proctor_Creek.jpg', caption: 'Following the deer' },
      { src: '/images/Proctor Creek/89_Proctor_Creek.jpg', caption: 'They always show you something beautiful.' },
      { src: '/images/Proctor Creek/90_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/92_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/93_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/94_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/95_Proctor_Creek.jpg', caption: 'There is no built environment.' },
      { src: '/images/Proctor Creek/96_Proctor_Creek.jpg', caption: 'All organisms build this world together.' },
      { src: '/images/Proctor Creek/97_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/98_Proctor_Creek.jpg', caption: 'There is no natural environment.' },
      { src: '/images/Proctor Creek/99_Proctor_Creek.jpg', caption: 'No life can be separate from nature.' },
      { src: '/images/Proctor Creek/100_Proctor_Creek.jpg', caption: 'All creatures live their trace on this Earth.' },
      { src: '/images/Proctor Creek/101_Proctor_Creek.jpg', caption: 'In the ways they shape their home.' },
      { src: '/images/Proctor Creek/102_Proctor_Creek.jpg', caption: 'A baby snake' },
      { src: '/images/Proctor Creek/103_Proctor_Creek.jpg', caption: 'A fiji water' },
      { src: '/images/Proctor Creek/104_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/105_Proctor_Creek.jpg', caption: 'Some traces are uniquely human.' },
      { src: '/images/Proctor Creek/106_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/107_Proctor_Creek.jpg', caption: 'One reason to love architecture is that it changes your way of seeing.' },
      { src: '/images/Proctor Creek/107_pc.jpg' },
      { src: '/images/Proctor Creek/108_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/108_pc.jpg', caption: 'One reason to leave architecture is when seeing does not change change you.' },
      { src: '/images/Proctor Creek/108_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/109_pc.jpg', caption: 'When witnessing no longer changes the one who sees.' },
      { src: '/images/Proctor Creek/109_Proctor_Creek.jpg', caption: 'They have stopped truly looking.' },
      { src: '/images/Proctor Creek/112_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/113_Proctor_Creek.jpg' },
      { src: '/images/Proctor Creek/114_Proctor_Creek.jpg', caption: 'Only humans seem to care for fences.' },
      { src: '/images/Proctor Creek/115_Proctor_Creek.jpg', caption: 'Division' },
      { src: '/images/Proctor Creek/116_Proctor_Creek.jpg', caption: 'Fragmentation' },
      { src: '/images/Proctor Creek/117_Proctor_Creek.jpg', caption: 'The separation between you and the world.' },
      { src: '/images/Proctor Creek/118_Proctor_Creek.jpg', caption: 'Mine and yours' },
      { src: '/images/Proctor Creek/119_Proctor_Creek.jpg', caption: 'You and me' },
      { src: '/images/Proctor Creek/120_Proctor_Creek.jpg', caption: 'The trees do not seem to care.' },
      { src: '/images/Proctor Creek/121_Proctor_Creek.jpg', caption: 'Active deer passing' },
      { src: '/images/Proctor Creek/122_Proctor_Creek.jpg', caption: 'We block the path.' },
      { src: '/images/Proctor Creek/123_Proctor_Creek.jpg', caption: 'How will they return?' },
      { src: '/images/Proctor Creek/124_Proctor_Creek.jpg', caption: 'Home' },
      { src: '/images/Proctor Creek/125_Proctor_Creek.jpg', caption: 'What cannot flow freely becomes ill.' },
      { src: '/images/Proctor Creek/126_Proctor_Creek.jpg', caption: 'A turtle resting in a field of wildflowers.' },
      { src: '/images/Proctor Creek/127_Proctor_Creek.jpg', caption: 'Can you see what is wrong here?' },
      { src: '/images/Proctor Creek/128_Proctor_Creek.jpg', caption: 'The flowers are untouched.' },
      { src: '/images/Proctor Creek/129_Proctor_Creek.jpg', caption: 'Poisoned by your own home.' },
      { src: '/images/Proctor Creek/130_Proctor_Creek.jpg', caption: 'Stairs to nothing.' },
      { src: '/images/Proctor Creek/131_Proctor_Creek.jpg', caption: 'Stairs never go to nothing.' },
      { src: '/images/Proctor Creek/132_Proctor_Creek.jpg', caption: 'Every stair leads to an invisible door.' },
      { src: '/images/Proctor Creek/133_Proctor_Creek.jpg', caption: 'A lost home.' },
      { src: '/images/Proctor Creek/134_Proctor_Creek.jpg', caption: 'The ghost of a family.' },
      { src: '/images/Proctor Creek/135_Proctor_Creek.jpg', caption: 'The remains of a community.' },
      { src: '/images/Proctor Creek/136_Proctor_Creek.jpg', caption: 'Can you see what is wrong here?' },
      { src: '/images/Proctor Creek/137_Proctor_Creek.jpg', caption: 'The water from the river has infected his eyes.' },
      { src: '/images/Proctor Creek/138_Proctor_Creek.jpg', caption: 'Laceration of the neck and under the arm.' },
      { src: '/images/Proctor Creek/139_Proctor_Creek.jpg', caption: 'He survives by his undying turtle rage.' },
      { src: '/images/Proctor Creek/140_Proctor_Creek.jpg', caption: 'Life heals quickly when harm is removed.' },
      { src: '/images/Proctor Creek/141_Proctor_Creek.jpg', caption: 'And healing is a messy process.' },
      { src: '/images/Proctor Creek/142_Proctor_Creek.jpg', caption: 'That begins when you allow life to return to itself.' },
      { src: '/images/Proctor Creek/143_Proctor_Creek.jpg', caption: 'Shelter' },
      { src: '/images/Proctor Creek/144_Proctor_Creek.jpg', caption: 'Light' },
      { src: '/images/Proctor Creek/145_Proctor_Creek.jpg', caption: 'Warmth' },
      { src: '/images/Proctor Creek/146_Proctor_Creek.jpg', caption: 'Movement' },
      { src: '/images/Proctor Creek/147_Proctor_Creek.jpg', caption: 'Growth' },
      { src: '/images/Proctor Creek/148_Proctor_Creek.jpg', caption: 'Accompany' },
      { src: '/images/Proctor Creek/149_Proctor_Creek.jpg', caption: 'Flowers' },
      { src: '/images/Proctor Creek/150_Proctor_Creek.jpg', caption: 'Beneath' },
      { src: '/images/Proctor Creek/151_Proctor_Creek.jpg', caption: 'Along' },
      { src: '/images/Proctor Creek/152_Proctor_Creek.jpg', caption: 'Span' },
      { src: '/images/Proctor Creek/153_Proctor_Creek.jpg', caption: 'Below' },
      { src: '/images/Proctor Creek/154_Proctor_Creek.jpg', caption: 'Investigate' },
      { src: '/images/Proctor Creek/155_Proctor_Creek.jpg', caption: 'Explore' },
      { src: '/images/Proctor Creek/156_Proctor_Creek.jpg', caption: 'Bridge' },
      { src: '/images/Proctor Creek/157_Proctor_Creek.jpg', caption: 'Refuge' },
      { src: '/images/Proctor Creek/158_Proctor_Creek.jpg', caption: 'Guidance' },
      { src: '/images/Proctor Creek/159_Proctor_Creek.jpg', caption: 'Wonder' },
      { src: '/images/Proctor Creek/160_Proctor_Creek.jpg', caption: 'Hiding' },
      { src: '/images/Proctor Creek/161_Proctor_Creek.jpg', caption: 'Seeking' },
      { src: '/images/Proctor Creek/162_Proctor_Creek.jpg', caption: 'Questionable support...' },
      { src: '/images/Proctor Creek/163_Proctor_Creek.jpg', caption: 'Paths that are not paths' },
      { src: '/images/Proctor Creek/164_Proctor_Creek.jpg', caption: 'Admiring' },
      { src: '/images/Proctor Creek/165_Proctor_Creek.jpg', caption: 'Climbing' },
      { src: '/images/Proctor Creek/166_Proctor_Creek.jpg', caption: 'More flowers' },
      { src: '/images/Proctor Creek/167_Proctor_Creek.jpg', caption: 'Behind' },
      { src: '/images/Proctor Creek/168_Proctor_Creek.jpg', caption: 'Left behind' },
      { src: '/images/Proctor Creek/169_Proctor_Creek.jpg', caption: 'A gift' },
      { src: '/images/Proctor Creek/170_Proctor_Creek.jpg', caption: 'A key' },
      { src: '/images/Proctor Creek/171_Proctor_Creek.jpg', caption: 'Life is long' },
      { src: '/images/Proctor Creek/172_Proctor_Creek.jpg', caption: 'It is time to go home.' },
      { src: '/images/Proctor Creek/172_vid_Proctor_Creek.mov', caption: 'Time to go home.' },
      { src: '/images/Proctor Creek/173_Proctor_Creek.jpg', caption: 'Home.' },
    ],
  },
  {
    id: 2, title: 'The Etowah River',
    subtitle: 'How care is replaced by convenience',
    year: '2024–Present', season: 'Summer 2024', location: 'Sutallee Trace Trails', author: 'Lyriel Todd',
    aspect: 'aspect-[16/9]', timelinePos: 15.5,
    slides: [
      { src: '/images/etowah river/01_etowah.jpg', caption: 'Park entrance.' },
      { src: '/images/etowah river/02_etowah.jpg', caption: 'Frank Stone Memorial Bridge as it was.' },
      { src: '/images/etowah river/03_etowah.jpg', caption: 'Little Free Library. Sharing books, donations, accessibility.' },
      { src: '/images/etowah river/04_etowah.jpg', caption: 'A little ways up the trail.' },
      { src: '/images/etowah river/05_etowah.jpg', caption: 'Discarded children\'s books.' },
      { src: '/images/etowah river/06_etowah.jpg', caption: 'This bridge was built in 1997 by Frank Stone and boy scout troop 241.' },
      { src: '/images/etowah river/07_etowah.jpg', caption: 'Local boy scouts constructed a bridge from telephone poles and a pulley system, without heavy construction machinery.' },
      { src: '/images/etowah river/08_etowah.jpg' },
      { src: '/images/etowah river/09_etowah.jpg', caption: 'Clearing the park to make the park more accessible.' },
      { src: '/images/etowah river/10_etowah.jpg', caption: 'A prefabricated aluminum truss bridge necessarily requires tearing down a small forest to implement.' },
      { src: '/images/etowah river/11_etowah.jpg', caption: 'It is now a matter of assembly, not ingenuity.' },
      { src: '/images/etowah river/12_etowah.jpg', caption: 'Sacrificing nature, so that it may be easier to consume.' },
      { src: '/images/etowah river/13_etowah.jpg', caption: 'No dogs allowed in the park. No children allowed in the park.' },
      { src: '/images/etowah river/14_etowah.jpg', caption: '+1000 years to natural decomposition.' },
      { src: '/images/etowah river/15_etowah.jpg', caption: 'Surveillance instead of community.' },
      { src: '/images/etowah river/16_etowah.jpg', caption: 'This park is also an active hunting ground during deer season.' },
      { src: '/images/etowah river/17_etowah.jpg', caption: 'It sits behind a high school, and a soon to be elementary school.' },
      { src: '/images/etowah river/18_etowah.jpg', caption: 'A pavilion that is kept locked at all times.' },
      { src: '/images/etowah river/19_etowah.jpg', caption: 'A decorative pavilion. What is the point of a pavilion that no one inhabits? We wouldn\'t want it to get dirty.' },
      { src: '/images/etowah river/20_etowah.jpg', caption: 'Prosecution is not teaching. Why do these people have no where else to go?' },
      { src: '/images/etowah river/21_etowah.jpg', caption: 'Ironically, if this was not an active shooting ground, it would only be quicker to develop into another pedestrian sidewalk.' },
      { src: '/images/etowah river/22_etowah.jpg', caption: 'This area rests in a flood plain.' },
      { src: '/images/etowah river/23_etowah.jpg', caption: 'In nature, it is fertile with nutrients and acts as a natural cleaner and collector of materials/debris.' },
      { src: '/images/etowah river/24_etowah.jpg', caption: 'This means that every time it rains and floods, this same natural healing mechanism pulls in human waste from the river and poisons itself.' },
      { src: '/images/etowah river/25_etowah.jpg', caption: 'In addition to human dumping.' },
      { src: '/images/etowah river/26_etowah.jpg', caption: 'In addition to casual littering.' },
      { src: '/images/etowah river/27_etowah.jpg', caption: 'More regulation. More prosecution. More punishment.' },
      { src: '/images/etowah river/28_etowah.jpg', caption: 'And yet the problem persists.' },
      { src: '/images/etowah river/29_etowah.jpg', caption: 'Apathy grows.' },
      { src: '/images/etowah river/30_etowah.jpg', caption: 'This place is so beautiful' },
      { src: '/images/etowah river/31_etowah.jpg', caption: 'So next year, when it grows a bit more ill. It will still be outstandingly beautiful.' },
      { src: '/images/etowah river/32_etowah.jpg', caption: 'So no one will notice.' },
      { src: '/images/etowah river/33_etowah.jpg', caption: 'That it loses a bit of color with every passing year.' },
      { src: '/images/etowah river/34_etowah.jpg', caption: 'Loses a bit more life.' },
      { src: '/images/etowah river/35_etowah.jpg', caption: 'There is already so much of it.' },
      { src: '/images/etowah river/36_etowah.jpg', caption: 'What is one more year of loss?' },
      { src: '/images/etowah river/37_etowah.jpg', caption: 'Small allowances.' },
      { src: '/images/etowah river/38_etowah.jpg' },
      { src: '/images/etowah river/39_etowah.jpg' },
      { src: '/images/etowah river/40_etowah.jpg' },
      { src: '/images/etowah river/41_etowah.jpg' },
      { src: '/images/etowah river/42_etowah.jpg' },
      { src: '/images/etowah river/43_etowah.jpg' },
      { src: '/images/etowah river/44_etowah.jpg' },
      { src: '/images/etowah river/45_etowah.jpg', caption: 'The beauty of leaves.' },
      { src: '/images/etowah river/46_etowah.jpg', caption: 'Human leaves.' },
      { src: '/images/etowah river/47_etowah.jpg', caption: 'What is wrong with a path that we must inhabit to walk?' },
      { src: '/images/etowah river/48_etowah.jpg', caption: 'That we must be present for.' },
      { src: '/images/etowah river/49_etowah.jpg', caption: 'To attend to.' },
      { src: '/images/etowah river/50_etowah.jpg', caption: 'This year, we clear a little more so we can walk side by side.' },
      { src: '/images/etowah river/51_etowah.jpg', caption: 'This year, we clear a little more so we can walk 3 by 3.' },
      { src: '/images/etowah river/52_etowah.jpg', caption: 'This year, we clear a little more so we can drive in instead of having to walk at all.' },
      { src: '/images/etowah river/53_etowah.jpg', caption: 'The walking was the point.' },
      { src: '/images/etowah river/54_etowah.jpg', caption: 'The counting was the point.' },
      { src: '/images/etowah river/55_etowah.jpg', caption: 'The time spent caring was the point.' },
      { src: '/images/etowah river/56_etowah.jpg', caption: 'The work that had to be done by hand was the point.' },
      { src: '/images/etowah river/57_etowah.jpg', caption: 'Nature is healing.' },
      { src: '/images/etowah river/58_etowah.jpg', caption: 'Because it allows the embodiment that human systems have forgotten.' },
      { src: '/images/etowah river/59_etowah.jpg', caption: 'The way we care for nature,' },
      { src: '/images/etowah river/60_etowah.jpg', caption: 'Is only the reflection of how we care for ourselves.' },
      { src: '/images/etowah river/61_etowah.jpg', caption: 'I was almost less interested in why people care for nature this way.' },
      { src: '/images/etowah river/62_etowah.jpg', caption: 'And more concerned as to why human beings care for each other in this way.' },
      { src: '/images/etowah river/63_etowah.jpg', caption: 'Why they care for themselves this way.' },
      { src: '/images/etowah river/64_etowah.jpg', caption: 'I love you.' },
      { src: '/images/etowah river/65_etowah.jpg', caption: 'Is not a statement of convenience.' },
      { src: '/images/etowah river/66_etowah.jpg', caption: 'It is not about taming what is "too wild."' },
      { src: '/images/etowah river/67_etowah.jpg', caption: 'It is not about making you easier for me to possess.' },
      { src: '/images/etowah river/68_etowah.jpg', caption: 'It is loving what is, by allowing it to continue being itself.' },
      { src: '/images/etowah river/69_etowah.jpg', caption: 'A small forest must be cleared for a prefabricated bridge.' },
      { src: '/images/etowah river/70_etowah.jpg', caption: 'It seems like a small price to pay.' },
      { src: '/images/etowah river/71_etowah.jpg', caption: 'Small allowances.' },
      { src: '/images/etowah river/72_etowah.jpg', caption: 'Of life.' },
      { src: '/images/etowah river/73_etowah.jpg', caption: 'Of nature' },
      { src: '/images/etowah river/75_etowah.jpg', caption: 'Of freedom.' },
      { src: '/images/etowah river/76_etowah.jpg', caption: 'Of communities.' },
      { src: '/images/etowah river/77_etowah.jpg', caption: 'Of human beings.' },
      { src: '/images/etowah river/78_etowah.jpg', caption: 'How is it that it ensures the exact things it was meant to overcome?' },
      { src: '/images/etowah river/79_etowah.jpg', caption: 'Because you are doing it in the same way.' },
      { src: '/images/etowah river/80_etowah.jpg', caption: 'With the same methods, the same tools.' },
      { src: '/images/etowah river/81_etowah.jpg', caption: 'The same ideas of care, the same ideas of love.' },
      { src: '/images/etowah river/82_etowah.jpg', caption: 'Over and over and over again.' },
      { src: '/images/etowah river/83_etowah.jpg', caption: 'We want the path to be easier.' },
      { src: '/images/etowah river/84_etowah.jpg', caption: 'We want it to be safer.' },
      { src: '/images/etowah river/85_etowah.jpg', caption: 'We want it to be beautiful the way it was, while also removing everything that makes it what it is.' },
      { src: '/images/etowah river/86_etowah.jpg', caption: 'There are no fish here.' },
      { src: '/images/etowah river/87_etowah.jpg', caption: 'I know, because I waded in.' },
      { src: '/images/etowah river/88_etowah.jpg', caption: 'So sensitive.' },
      { src: '/images/etowah river/89_etowah.jpg', caption: 'Monster.' },
      { src: '/images/etowah river/90_etowah.jpg', caption: 'We do not ask why people have stopped caring.' },
      { src: '/images/etowah river/91_etowah.jpg', caption: 'We simply punish.' },
      { src: '/images/etowah river/92_etowah.jpg', caption: 'We do not protect.' },
      { src: '/images/etowah river/93_etowah.jpg', caption: 'We contain.' },
      { src: '/images/etowah river/94_etowah.jpg', caption: 'We isolate.' },
      { src: '/images/etowah river/95_etowah.jpg', caption: 'Nature without nature.' },
      { src: '/images/etowah river/96_etowah.jpg', caption: 'We want the idea of nature.' },
      { src: '/images/etowah river/97_etowah.jpg', caption: 'Surveillance instead of community.' },
      { src: '/images/etowah river/98_etowah.jpg', caption: 'Progress over continuity.' },
      { src: '/images/etowah river/99_etowah.jpg', caption: 'Progress.' },
      { src: '/images/etowah river/100_etowah.jpg', caption: 'More progress.' },
      { src: '/images/etowah river/101_etowah.jpg', caption: 'What is the cost?' },
      { src: '/images/etowah river/102_etowah.jpg', caption: 'What does your care cost?' },
      { src: '/images/etowah river/103_etowah.jpg' },
      { src: '/images/etowah river/104_etowah.jpg' },
      { src: '/images/etowah river/105_etowah.jpg' },
      { src: '/images/etowah river/106_etowah.jpg' },
      { src: '/images/etowah river/107_etowah.jpg', caption: 'This was a home once.' },
    ],
  },
  {
    id: 4, title: 'The Machine Eye',
    subtitle: 'How perception without feeling becomes blindness',
    year: '2025', season: 'Spring 2025', location: 'Georgia Tech, Atlanta, GA', author: 'Lyriel Todd',
    aspect: 'aspect-[16/9]', timelinePos: 50,
    slides: [
      { src: '/images/the machine eye/01_the_machine_eye.jpg', caption: 'Can AI replace human design? This was the question posed to us. It was the wrong question to ask. An easy question to ask. The machine question. Why have human beings made each other replaceable? That is the real question. The hard question to ask, and the only question worth asking.' },
      { src: '/images/the machine eye/02_the_machine_eye.jpg', caption: 'The site project - Ponce de Leon Avenue - Atlanta Beltline development.' },
      { src: '/images/the machine eye/03_the_machine_eye.jpg', caption: 'The historic healing spring of Ponce de Leon. Fragmented, distorted, commodified.' },
      { src: '/images/the machine eye/04_the_machine_eye.jpg', caption: 'The ouroboros delphinium - the world in bloom. There are winds that nourish. Return. There are winds that only feed. Consume.' },
      { src: '/images/the machine eye/05_the_machine_eye.jpg', caption: 'The machine eye - it is not AI. It is the human eye, the body eye. Looking without seeing. Seeing without feeling. Observing without witnessing. Can you see what is broken?' },
      { src: '/images/the machine eye/06_the_machine_eye.jpg', caption: 'Tourist Attraction - Tiny Doors of Atlanta no.6 Year 2020' },
      { src: '/images/the machine eye/07_the_machine_eye.jpg', caption: 'The human eye is not the body eye. It is the eye that sees by feeling. It requires a question. It requires not knowing. To witness something is to be changed by it.' },
      { src: '/images/the machine eye/08_the_machine_eye.jpg', caption: 'Tourist Attraction - Tiny Doors of Atlanta no.6 "Out of commission"' },
      { src: '/images/the machine eye/09_the_machine_eye.jpg', caption: 'Tourist Attraction - Tiny Doors of Atlanta no.6 "On loan"' },
      { src: '/images/the machine eye/10_the_machine_eye.jpg', caption: 'Tourist Attraction - Tiny Doors of Atlanta no.6 "Faux"' },
      { src: '/images/the machine eye/11_the_machine_eye.jpg', caption: 'Who burned down the tiny door?' },
      { src: '/images/the machine eye/12_the_machine_eye.jpg', caption: 'Someone who\'s home was replaced by a tiny door.' },
      { src: '/images/the machine eye/13_the_machine_eye.jpg', caption: 'But where do they go?' },
      { src: '/images/the machine eye/14_the_machine_eye.jpg', caption: 'Where we don\'t have to see them.' },
      { src: '/images/the machine eye/15_the_machine_eye.jpg', caption: 'Where human beings are treated as a problem to be solved, and not as human beings.' },
      { src: '/images/the machine eye/16_the_machine_eye.jpg', caption: 'We treat the world as we treat each other.' },
      { src: '/images/the machine eye/17_the_machine_eye.jpg', caption: 'We treat each other as we treat the world.' },
      { src: '/images/the machine eye/18_the_machine_eye.jpg', caption: 'Divide it.' },
      { src: '/images/the machine eye/19_the_machine_eye.jpg', caption: '"The Gateway of Change"' },
      { src: '/images/the machine eye/20_the_machine_eye.jpg', caption: 'AI cannot replace people' },
      { src: '/images/the machine eye/21_the_machine_eye.jpg', caption: 'because people have already replaced each other.' },
      { src: '/images/the machine eye/22_the_machine_eye.jpg', caption: 'To refrain from harm. To refrain from designing over a wound. To refrain from deepening it.' },
    ],
  },
  {
    id: 3, title: 'Frank Stone Memorial Bridge',
    subtitle: 'A letter to the Trace Trail Stewards',
    year: '2025', season: 'Summer 2025', location: 'Boling Park, GA', author: 'Lyriel Le',
    aspect: 'aspect-[16/10]', timelinePos: 61.5,
    slides: [
      { src: '/images/memorial bridge/01_memorial_bridge.jpg', caption: 'Our home.' },
      { src: '/images/memorial bridge/02_memorial_bridge.jpg', caption: 'What is the difference between stewardship, and ownership?' },
      { src: '/images/memorial bridge/03_memorial_bridge.jpg', caption: 'Care as repair, not replacement.' },
      { src: '/images/memorial bridge/04_memorial_bridge.jpg', caption: 'Care as inclusion, as accessibility, as returning.' },
      { src: '/images/memorial bridge/05_memorial_bridge.jpg', caption: 'Possession says, I have you. Care says, I hold you.' },
      { src: '/images/memorial bridge/06_memorial_bridge.jpg', caption: 'A gateway says, this place is cared for, and that all are welcome here.' },
      { src: '/images/memorial bridge/07_memorial_bridge.jpg', caption: 'When design is grounded in real world application' },
      { src: '/images/memorial bridge/08_memorial_bridge.jpg', caption: 'Surveillance becomes witnessing' },
      { src: '/images/memorial bridge/09_memorial_bridge.jpg', caption: 'Inhabitation becomes continuity' },
      { src: '/images/memorial bridge/10_memorial_bridge.jpg', caption: 'Learning becomes meaningful — becomes inheritance. We care for what we feel a part of.' },
    ],
  },
  {
    id: 1, title: 'Baobab',
    subtitle: 'A Community Center in Africa',
    year: 'Kaira Looro 2026', season: 'Spring 2026', location: 'Casamance, Senegal', author: 'Lyriel Le',
    aspect: 'aspect-[16/9]', timelinePos: 96,
    slides: [
      { src: '/images/baobab/01_Board.jpg' },
      { src: '/images/baobab/02_Morning.jpg', caption: 'Dawn. The seed is planted.' },
      { src: '/images/baobab/03_Library.jpg', caption: 'The shelves fill with voices.' },
      { src: '/images/baobab/04_Afternoon.jpg', caption: 'The meetings have started.' },
      { src: '/images/baobab/05_Workshop.jpg', caption: 'The water has just risen slightly.' },
      { src: '/images/baobab/06_Evening.jpg', caption: 'Dusk. Fruit after rain.' },
    ],
  },
];


const PLACEHOLDER = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600';

const isVideo = (src: string) => /\.(mov|mp4|webm)$/i.test(src);

function SlideDeck({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const pinchRef = useRef<{ startDist: number; startZoom: number } | null>(null);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; startPanX: number; startPanY: number } | null>(null);
  const dragMovedRef = useRef(false);
  const swipeStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const swipeHandledRef = useRef(false);

  const updateZoom = useCallback((z: number) => { zoomRef.current = z; setZoom(z); }, []);
  const updatePan = useCallback((p: { x: number; y: number }) => { panRef.current = p; setPan(p); }, []);
  const resetView = useCallback(() => { updateZoom(1); updatePan({ x: 0, y: 0 }); }, [updateZoom, updatePan]);

  const next = useCallback(() => setIdx(i => (i + 1) % project.slides.length), [project.slides.length]);
  const prev = useCallback(() => setIdx(i => (i - 1 + project.slides.length) % project.slides.length), [project.slides.length]);

  useEffect(() => { setIdx(0); setAutoPlay(true); }, [project.id]);

  // Reset view when changing slides while in fullscreen
  useEffect(() => { if (fullscreen) resetView(); }, [idx, fullscreen, resetView]);

  useEffect(() => {
    if (!autoPlay || fullscreen) return;
    timerRef.current = setTimeout(next, 4500);
    return () => clearTimeout(timerRef.current);
  }, [idx, autoPlay, next, fullscreen]);

  // Keyboard, scroll-wheel zoom, mouse drag
  useEffect(() => {
    if (!fullscreen) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFullscreen(false); resetView(); }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newZ = Math.max(1, Math.min(5, zoomRef.current - e.deltaY * 0.003));
      updateZoom(newZ);
      if (newZ === 1) updatePan({ x: 0, y: 0 });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMovedRef.current = true;
      updatePan({ x: dragRef.current.startPanX + dx, y: dragRef.current.startPanY + dy });
    };

    const onMouseUp = () => { dragRef.current = null; setIsDragging(false); };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [fullscreen, resetView, updateZoom, updatePan]);

  // Pinch-to-zoom + single-finger drag for mobile
  useEffect(() => {
    if (!fullscreen) return;

    const dist = (t: TouchList) => {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchRef.current = { startDist: dist(e.touches), startZoom: zoomRef.current };
        dragRef.current = null;
      } else if (e.touches.length === 1 && zoomRef.current > 1) {
        dragRef.current = {
          startX: e.touches[0].clientX, startY: e.touches[0].clientY,
          startPanX: panRef.current.x, startPanY: panRef.current.y,
        };
        dragMovedRef.current = false;
      } else if (e.touches.length === 1 && zoomRef.current === 1) {
        swipeStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, time: Date.now() };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        const newZ = Math.max(1, Math.min(5, pinchRef.current.startZoom * (dist(e.touches) / pinchRef.current.startDist)));
        updateZoom(newZ);
        if (newZ === 1) updatePan({ x: 0, y: 0 });
      } else if (e.touches.length === 1 && dragRef.current) {
        e.preventDefault();
        const dx = e.touches[0].clientX - dragRef.current.startX;
        const dy = e.touches[0].clientY - dragRef.current.startY;
        dragMovedRef.current = true;
        updatePan({ x: dragRef.current.startPanX + dx, y: dragRef.current.startPanY + dy });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (swipeStartRef.current && zoomRef.current === 1) {
        const touch = e.changedTouches[0];
        if (touch) {
          const dx = touch.clientX - swipeStartRef.current.x;
          const dy = touch.clientY - swipeStartRef.current.y;
          const dt = Date.now() - swipeStartRef.current.time;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 2 && dt < 600) {
            setAutoPlay(false);
            if (dx < 0) next(); else prev();
          }
        }
      }
      swipeStartRef.current = null;
      pinchRef.current = null;
      dragRef.current = null;
    };

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [fullscreen, updateZoom, updatePan]);

  const openFullscreen = () => { setFullscreen(true); resetView(); };
  const closeFullscreen = () => { setFullscreen(false); resetView(); };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomRef.current <= 1) return;
    e.preventDefault();
    dragMovedRef.current = false;
    dragRef.current = {
      startX: e.clientX, startY: e.clientY,
      startPanX: panRef.current.x, startPanY: panRef.current.y,
    };
    setIsDragging(true);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragMovedRef.current) { dragMovedRef.current = false; return; }
    if (zoomRef.current > 1) { updateZoom(1); updatePan({ x: 0, y: 0 }); }
    else { closeFullscreen(); }
  };

  const onNav = (fn: () => void) => { setAutoPlay(false); fn(); };
  const slide = project.slides[idx] ?? { src: PLACEHOLDER };

  return (
    <>
      {/* Normal view */}
      <div
        className="relative aspect-[16/9] w-full bg-[#EAEAE8] overflow-hidden group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={(e) => { const t = e.touches[0]; swipeStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now() }; }}
        onTouchEnd={(e) => {
          if (!swipeStartRef.current) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - swipeStartRef.current.x;
          const dy = t.clientY - swipeStartRef.current.y;
          const dt = Date.now() - swipeStartRef.current.time;
          swipeStartRef.current = null;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 2 && dt < 600) {
            swipeHandledRef.current = true;
            onNav(dx < 0 ? next : prev);
          }
        }}
        onClick={() => { if (swipeHandledRef.current) { swipeHandledRef.current = false; return; } openFullscreen(); }}
      >
        {isVideo(slide.src) ? (
          <video
            src={slide.src}
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={slide.src}
            alt={`${project.author} — ${project.title}${project.location ? `, ${project.location}` : ''}`}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        )}

        {slide.caption && (
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none">
            <p className="text-[11.5px] text-white font-[300] tracking-wide leading-[1.7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{slide.caption}</p>
          </div>
        )}

        <div className="absolute top-4 left-4 transition-opacity duration-300 pointer-events-none" style={{ opacity: hovered ? 0.9 : 0 }}>
          <div className="px-2.5 py-1 bg-black/25 backdrop-blur-sm rounded-full">
            <p className="text-[9px] text-white/90 tracking-[0.15em] uppercase font-[300]">expand</p>
          </div>
        </div>

        <button onClick={(e) => { e.stopPropagation(); onNav(prev); }} className="absolute left-0 top-0 bottom-0 w-[20%] flex items-center justify-start pl-4 focus:outline-none" aria-label="Previous image">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }}>
            <ChevronLeft size={20} className="text-[#333333]" />
          </div>
        </button>

        <button onClick={(e) => { e.stopPropagation(); onNav(next); }} className="absolute right-0 top-0 bottom-0 w-[20%] flex items-center justify-end pr-4 focus:outline-none" aria-label="Next image">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }}>
            <ChevronRight size={20} className="text-[#333333]" />
          </div>
        </button>

        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }}>
          <p className="text-[10px] text-[#333333] font-[400] tracking-wider">{idx + 1} / {project.slides.length}</p>
        </div>

      </div>

      {/* Fullscreen lightbox */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#F5F4F2]/80 backdrop-blur-2xl"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
            {isVideo(slide.src) ? (
              <video
                src={slide.src}
                className="max-w-full max-h-full object-contain select-none"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  transformOrigin: 'center center',
                }}
                autoPlay
                loop
                muted
                playsInline
                controls
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={slide.src}
                alt={`${project.author} — ${project.title}${project.location ? `, ${project.location}` : ''}`}
                className="max-w-full max-h-full object-contain select-none"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  cursor: isDragging ? 'grabbing' : zoom > 1 ? 'grab' : 'pointer',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  transformOrigin: 'center center',
                }}
                draggable={false}
                onMouseDown={handleMouseDown}
                onClick={handleImageClick}
              />
            )}

            {slide.caption && (
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none" style={{ opacity: zoom > 1 ? 0 : 1, transition: 'opacity 0.2s' }}>
                <p className="text-[11px] text-[#888888] font-[300] tracking-wide italic">{slide.caption}</p>
              </div>
            )}

            {/* Contextual hint */}
            <div
              className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300"
              style={{ opacity: zoom === 1 ? 1 : zoom > 1 && !isDragging ? 1 : 0 }}
            >
              <div className="px-3 py-1.5 bg-black/10 backdrop-blur-sm rounded-full">
                <p className="text-[9px] text-[#555555] tracking-[0.18em] uppercase font-[300] whitespace-nowrap">
                  {zoom === 1 ? 'scroll or pinch to zoom' : 'drag to pan'}
                </p>
              </div>
            </div>

            <button
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/12 transition-colors"
              onClick={(e) => { e.stopPropagation(); closeFullscreen(); }}
              aria-label="Close"
            >
              <X size={16} className="text-[#555555]" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onNav(prev); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/12 transition-colors"
              style={{ opacity: zoom > 1 ? 0 : 1, transition: 'opacity 0.2s', pointerEvents: zoom > 1 ? 'none' : 'auto' }}
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="text-[#555555]" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onNav(next); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/12 transition-colors"
              style={{ opacity: zoom > 1 ? 0 : 1, transition: 'opacity 0.2s', pointerEvents: zoom > 1 ? 'none' : 'auto' }}
              aria-label="Next"
            >
              <ChevronRight size={20} className="text-[#555555]" />
            </button>

          </div>
        </div>
      )}
    </>
  );
}

function SmallTile({ project, active, onClick, onHover }: { project: Project; active: boolean; onClick: () => void; onHover: (p: Project | null) => void }) {
  const cover = project.slides[0]?.src ?? PLACEHOLDER;
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); onHover(project); }}
      onMouseLeave={() => { setHovered(false); onHover(null); }}
      className="relative flex-1 aspect-[4/3] bg-[#EAEAE8] overflow-hidden cursor-pointer focus:outline-none group"
      style={{ outline: active ? '1px solid #4D6844' : 'none', outlineOffset: '2px' }}
    >
      <img src={cover} alt={`${project.author} — ${project.title}${project.location ? `, ${project.location}` : ''}`} className="w-full h-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 pt-8 transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0 }}>
        <p className="text-[10px] text-white/90 font-[300] tracking-wide">{project.location}</p>
      </div>
      {active && <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-botanical" />}
    </button>
  );
}

export default function WorkGallery() {
  const [activeId, setActiveId] = useState(() => PROJECTS[Math.floor(Math.random() * PROJECTS.length)].id);
  const [hoverProject, setHoverProject] = useState<Project | null>(null);
  const [headingRef, headingVisible] = useInView(0.2);
  const active = PROJECTS.find(p => p.id === activeId)!;

  const marker = hoverProject ?? active;
  const markerPos = marker.timelinePos;
  const markerLabel = marker.season;

  return (
    <section id="work" className="px-8 md:px-16 py-28 max-w-screen-xl mx-auto border-t border-[#EBEBEB]">
      <div ref={headingRef as React.RefObject<HTMLDivElement>} className="mb-12"
        style={{ opacity: headingVisible ? 1 : 0, transform: headingVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}>
        <p className="text-[11px] tracking-[0.22em] uppercase text-botanical font-medium mb-3">Selected Projects &amp; Studies</p>
        <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-[200] text-[#111111] tracking-[-0.01em]">Reflections</h2>
      </div>

      <div className="mb-4"><SlideDeck project={active} /></div>

      <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-[18px] font-[400] text-[#111111] tracking-wide">{active.title}</h3>
          <p className="text-[13px] text-[#999999] font-[300] tracking-wide mt-1">{active.subtitle}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[13px] text-[#999999] font-[300]">{active.year}</p>
          <p className="text-[11px] text-[#C0C0C0] font-[300] mt-0.5 tracking-wide">{active.location}</p>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[#D0D0CC] font-[300] shrink-0 whitespace-nowrap">Spring 2024</span>

        <div className="flex-1 relative" style={{ height: '24px' }}>
          <div className="absolute left-0 right-0 h-px bg-[#E5E5E2]" style={{ top: '50%' }} />
          <div
            className="absolute pointer-events-none transition-all duration-300"
            style={{ left: `${markerPos}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '110px', height: '1px',
              background: 'linear-gradient(to right, transparent 0%, rgba(77,104,68,0.55) 30%, rgba(77,104,68,0.8) 50%, rgba(77,104,68,0.55) 70%, transparent 100%)' }}
          />
          <span
            className="absolute text-[9px] tracking-[0.1em] text-[#777777] font-[300] -translate-x-1/2 pointer-events-none transition-all duration-300"
            style={{ left: `${markerPos}%`, bottom: 'calc(50% + 5px)' }}
          >
            {markerLabel}
          </span>
        </div>

        <span className="text-[10px] tracking-[0.15em] uppercase text-[#D0D0CC] font-[300] shrink-0 whitespace-nowrap">Spring 2026</span>
      </div>

      <div className="flex gap-3 md:gap-4">
        {PROJECTS.map(p => (
          <SmallTile key={p.id} project={p} active={p.id === activeId} onClick={() => setActiveId(p.id)} onHover={setHoverProject} />
        ))}
      </div>
    </section>
  );
}
